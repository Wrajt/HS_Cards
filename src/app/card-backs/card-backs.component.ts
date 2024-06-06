import {Component, OnInit} from '@angular/core';
import { ApiService} from "../api.service";
import { CommonModule, NgForOf } from '@angular/common';

@Component({
  selector: 'app-card-backs',
  standalone: true,
  imports: [NgForOf, CommonModule],
  templateUrl: './card-backs.component.html',
  styleUrl: './card-backs.component.css'
})
export class CardBacksComponent implements OnInit{
  cardBackNames: string[] = []
  cardBackImg: string[] = []
  cardBackText: string[] = []

ngOnInit() {
  this.apiService.getCardBacks().subscribe((data: any) => {
    for (let i = 0; i < data.cardBacks.length; i++) {
      this.cardBackNames.push(data.cardBacks[i].name.en_US)
      this.cardBackImg.push(data.cardBacks[i].image)
      this.cardBackText.push(data.cardBacks[i].text.en_US)
    }
  })
}
  constructor(private apiService: ApiService) {}
}
