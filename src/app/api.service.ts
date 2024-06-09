import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CLIENT_ID, CLIENT_SECRET } from "./API_KEYS.const";
import { Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { CardDataInterface, Card } from './interfaces/card-data.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private tokenUrl = 'https://oauth.battle.net/token';
  private accessToken: string | null = null;

  constructor(private http: HttpClient) {
    console.log("API Service is working!");
  }
  private getToken(): Observable<any> {
    console.log("Fetching access token...");
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
    });
    const body = new HttpParams().set('grant_type', 'client_credentials');

    return this.http.post(this.tokenUrl, body.toString(), { headers: headers })
      .pipe(
        tap((response: any) => {
          console.log("Token response:", response);
          this.accessToken = response.access_token;
          console.log("Access token set:", this.accessToken);
        })
      );
  }
  private fetchCardBacks(): Observable<any> {
    if (!this.accessToken) {
      throw new Error("Access token is null");
    }
    const url = `https://us.api.blizzard.com/hearthstone/cardbacks?sort=dateAdded%3Adesc&access_token=${this.accessToken}`;
    console.log("Fetching card backs with token:", this.accessToken);
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

private fetchAllCards(): Observable<CardDataInterface>{
    if(!this.accessToken){
      throw new Error("Access token is null");
    }
    const url = `https://us.api.blizzard.com/hearthstone/cards?locale=en_US&pageSize=9028&access_token=${this.accessToken}`;
    console.log("Fetching all cards with token:", this.accessToken);
    return this.http.get<CardDataInterface>(url)
}
getAllCards(): Observable<CardDataInterface>{
    if (this.accessToken){
      return this.fetchAllCards();
    } else {
      return this.getToken().pipe(
        switchMap(() => this.fetchAllCards())
      );
    }
}
}
