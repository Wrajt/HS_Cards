import { Component, OnInit } from '@angular/core';
import { ApiService} from "../api.service";
import { CommonModule, NgForOf } from '@angular/common';
@Component({
  selector: 'app-card-info',
  standalone: true,
  imports: [NgForOf, CommonModule],
  templateUrl: './card-info.component.html',
  styleUrl: './card-info.component.css'
})
export class CardInfoComponent implements OnInit{
  knightCardNames: string[] = []
  knightCardImg: string[] = []
  knightCardText: string[] = []

  ngOnInit() {
    this.apiService.getDeathKnightCards().subscribe((data: any) => {
      for (let i = 0; i < data.cards.length; i++) {
        this.knightCardNames.push(data.cards[i].name)
        this.knightCardImg.push(data.cards[i].image)
        this.knightCardText.push(data.cards[i].text)
      }
    })
  }
  constructor(private apiService: ApiService) {}
}
