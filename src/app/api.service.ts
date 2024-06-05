import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  getCardBacks() {
    const url = "https://us.api.blizzard.com/hearthstone/cardbacks?sort=dateAdded%3Adesc&order (deprecated)=desc&access_token=EUAunENjoJdyi5oRxLz0X3k8vHSzQJ7U4F"
    return this.http.get(url);
  }

  constructor(private http: HttpClient) {
    console.log("API Service is working!")
  }
}
