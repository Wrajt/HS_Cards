import { Component, OnInit } from '@angular/core';
import { ApiService } from "../api.service";
import { CommonModule, NgForOf } from '@angular/common';
import { PaginatorComponent } from "../paginator/paginator.component";

@Component({
  selector: 'app-card-backs',
  standalone: true,
  imports: [NgForOf, CommonModule, PaginatorComponent],
  templateUrl: './card-backs.component.html',
  styleUrls: ['./card-backs.component.css']
})
export class CardBacksComponent implements OnInit {
  cardBacks: any[] = []; // Array to hold all card backs
  currentPage: number = 1;
  pageSize: number = 40;
  totalPages: number = 1; // Default to 1 to prevent division by zero or undefined

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadCardBacks();
  }

  loadCardBacks(page: number = this.currentPage, pageSize: number = this.pageSize) {
    this.apiService.getCardBacks(page, pageSize).subscribe((data: any) => {
      this.cardBacks = data.cardBacks.map((cardBack: any) => ({
        name: cardBack.name,
        text: cardBack.text,
        image: cardBack.image
      }));
      this.totalPages = data.pageCount;
      this.currentPage = data.page;
    });
  }


  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.loadCardBacks(this.currentPage);
  }
}
