import { Component, OnInit, Input} from '@angular/core';
import { ApiService } from "../api.service";
import {PaginatorComponent} from "../paginator/paginator.component";
import {Card} from "../interfaces/card-data.interface";
import {LoadingContainerComponent} from "../loading-contaier/loading-container.component";
import {NgForOf} from "@angular/common";


@Component({
  selector: 'app-cards-display',
  standalone: true,
  imports: [PaginatorComponent, LoadingContainerComponent, NgForOf],
  templateUrl: './cards-display.component.html',
  styleUrl: './cards-display.component.css'
})
export class CardsDisplayComponent implements OnInit{
  cards: { [key: string]: Card[] } = {};
  @Input() currentClass: string = '';
  currentPage: number = 1;
  pageSize: number = 20;
  totalPages: number = 1;
  loading: boolean = false;
  error: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCardInfo(1, this.pageSize, this.currentClass)
  }

  public loadCardInfo(page: number = this.currentPage, pageSize: number = this.pageSize, className: string = this.currentClass): void {
    this.loading = true;
    this.apiService.getCardInfo(page, pageSize, className).subscribe({
      next: (data: { cards: Card[], pageCount: number, page: number }) => {
        this.cards[className] = this.getUniqueCards(data.cards);
        this.totalPages = data.pageCount;
        this.currentPage = data.page;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = true;
        this.loading = false;
      }
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

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.loadCardInfo(this.currentPage, this.pageSize, this.currentClass);
  }
}
