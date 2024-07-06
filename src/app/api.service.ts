import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CLIENT_ID, CLIENT_SECRET } from "./API_KEYS.const";
import { Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private tokenUrl = 'https://oauth.battle.net/token';
  private accessToken: string | null = null;

  constructor(private http: HttpClient) {
  }
  private getToken(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
    });
    const body = new HttpParams().set('grant_type', 'client_credentials');

    return this.http.post(this.tokenUrl, body.toString(), { headers: headers })
      .pipe(
        tap((response: any) => {
          this.accessToken = response.access_token;
        })
      );
  }
  private fetchCardBacks(page: number = 1, pageSize: number = 40): Observable<any> {
    if (!this.accessToken) {
      throw new Error("Access token is null");
    }
    const url = `https://us.api.blizzard.com/hearthstone/cardbacks?locale=en_US&pageSize=${pageSize}&page=${page}&access_token=${this.accessToken}`;
    return this.http.get(url);
  }
  getCardBacks(page: number = 1, pageSize: number = 40): Observable<any> {
    if (this.accessToken) {
      return this.fetchCardBacks(page, pageSize);
    } else {
      return this.getToken().pipe(
        switchMap(() => this.fetchCardBacks(page, pageSize))
      );
    }
  }

  private fetchCardInfo(page: number= 1, pageSize: number = 40,className: string="") :Observable<any>{
    if (!this.accessToken){
      throw new Error ("Access token is null");
    }
    const url:string =`https://us.api.blizzard.com/hearthstone/cards?locale=en_US&class=${className}&page=${page}&pageSize=${pageSize}&access_token=${this.accessToken}`;
    return this.http.get(url)
  }

  getCardInfo(page: number= 1, pageSize: number = 40,className: string=""):Observable<any>{
    if (this.accessToken) {
      return this.fetchCardInfo(page, pageSize, className)
    } else {
      return this.getToken().pipe(
        switchMap(()=> this.fetchCardInfo(page, pageSize, className))
      )
    }
  }

}
