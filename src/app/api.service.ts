import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CLIENT_ID, CLIENT_SECRET } from './API_KEYS.const';
import { Observable, of } from 'rxjs';
import { tap, switchMap, catchError } from 'rxjs/operators';
import { CardDataInterface, Card } from './interfaces/card-data.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private tokenUrl = 'https://oauth.battle.net/token';
  private accessToken: string | null = null;

  constructor(private http: HttpClient) {
    console.log('API Service is working!');
  }

  private getToken(): Observable<any> {
    console.log('Fetching access token...');
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
    });
    const body = new HttpParams().set('grant_type', 'client_credentials');

    return this.http.post(this.tokenUrl, body.toString(), { headers: headers })
      .pipe(
        tap((response: any) => {
          console.log('Token response:', response);
          this.accessToken = response.access_token;
          console.log('Access token set:', this.accessToken);
        })
      );
  }

  private fetchCardBacks(): Observable<any> {
    if (!this.accessToken) {
      throw new Error('Access token is null');
    }
    const url = `https://us.api.blizzard.com/hearthstone/cardbacks?sort=dateAdded%3Adesc&access_token=${this.accessToken}`;
    console.log('Fetching card backs with token:', this.accessToken);
    return this.http.get(url);
  }

  getCardBacks(): Observable<any> {
    if (this.accessToken) {
      return this.fetchCardBacks();
    } else {
      return this.getToken().pipe(
        switchMap(() => this.fetchCardBacks())
      );
    }
  }

  private fetchPage(page: number, pageSize: number = 500): Observable<CardDataInterface> {
    if (!this.accessToken) {
      throw new Error('Access token is null');
    }
    const url = `https://us.api.blizzard.com/hearthstone/cards?locale=en_US&pageSize=${pageSize}&page=${page}&access_token=${this.accessToken}`;
    console.log(`Fetching page ${page} with token:`, this.accessToken);
    return this.http.get<CardDataInterface>(url);
  }

  private fetchAllCards(): Observable<Card[]> {
    let allCards: Card[] = [];
    let page = 1;

    const fetchNextPage = (): Observable<Card[]> => {
      return this.fetchPage(page).pipe(
        switchMap(data => {
          allCards = [...allCards, ...data.cards];
          if (data.cards.length === 500) { // Check if this is the last page
            page++;
            return fetchNextPage();
          } else {
            return of(allCards);
          }
        }),
        catchError(error => {
          console.error('Error fetching cards:', error);
          return of(allCards);
        })
      );
    };

    return fetchNextPage();
  }

  getAllCards(): Observable<Card[]> {
    if (this.accessToken) {
      return this.fetchAllCards();
    } else {
      return this.getToken().pipe(
        switchMap(() => this.fetchAllCards())
      );
    }
  }
}
