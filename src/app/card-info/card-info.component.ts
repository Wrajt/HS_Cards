import { Component, OnInit } from '@angular/core';
import { ApiService } from "../api.service";
import { CommonModule, NgForOf } from '@angular/common';
import { MatTab, MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { PaginatorComponent } from "../paginator/paginator.component";
import { Card } from "../interfaces/card-data.interface";

@Component({
  selector: 'app-card-info',
  standalone: true,
  imports: [NgForOf, CommonModule, MatTabGroup, MatTab, MatTabsModule, PaginatorComponent],
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.css']
})
export class CardInfoComponent implements OnInit {
  classNames: string[] = ['warrior', 'mage', 'druid', 'hunter', 'paladin', 'priest', 'rogue', 'shaman', 'warlock', 'neutral'];
  cards: { [key: string]: Card[] } = {};
  currentClass: string = 'warrior';
  currentPage: number = 1;
  pageSize: number = 20;
  totalPages: number = 1;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.classNames.forEach(className => this.loadCardInfo(1, this.pageSize, className));
  }

  loadCardInfo(page: number = this.currentPage, pageSize: number = this.pageSize, className: string = this.currentClass): void {
    this.apiService.getCardInfo(page, pageSize, className).subscribe((data: { cards: Card[], pageCount: number, page: number }) => {
      const uniqueCards = this.getUniqueCards(data.cards);
      this.cards[className] = uniqueCards;
      this.totalPages = data.pageCount;
      this.currentPage = data.page;
    });
  }

  getUniqueCards(cards: Card[]): Card[] {
    const uniqueCards = new Map<string, Card>();
    cards.forEach(card => {
      if (!uniqueCards.has(card.name)) {
        uniqueCards.set(card.name, card);
      }
    });
    return Array.from(uniqueCards.values());
  }

  onClassChange(className: string): void {
    this.currentClass = className;
    this.currentPage = 1;
    this.loadCardInfo(this.currentPage, this.pageSize, className);
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.loadCardInfo(this.currentPage, this.pageSize, this.currentClass);
  }

}
