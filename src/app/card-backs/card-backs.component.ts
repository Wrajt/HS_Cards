import { Component, OnInit } from '@angular/core';
import { ApiService } from "../api.service";
import { CommonModule, NgForOf } from '@angular/common';
import { PaginatorComponent } from "../paginator/paginator.component";
import { LoadingContainerComponent} from "../loading-contaier/loading-container.component";

@Component({
  selector: 'app-card-backs',
  standalone: true,
  imports: [NgForOf, CommonModule, PaginatorComponent, LoadingContainerComponent],
  templateUrl: './card-backs.component.html',
  styleUrls: ['./card-backs.component.css']
})
export class CardBacksComponent implements OnInit {
  cardBacks: any[] = []; // Array to hold all card backs
  currentPage: number = 1;
  pageSize: number = 18;
  totalPages: number = 1; // Default to 1 to prevent division by zero or undefined
  loading: boolean = false; // Dodane pole do przechowywania stanu ładowania
  error: boolean = false; // Dodane pole do przechowywania stanu błędu


  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadCardBacks();
  }

  loadCardBacks(page: number = this.currentPage, pageSize: number = this.pageSize): void {
    this.loading = true; // Ustawienie stanu ładowania na true przed pobraniem danych

    this.apiService.getCardBacks(page, pageSize).subscribe(
      (data: any) => {
        this.cardBacks = data.cardBacks.map((cardBack: any) => ({
          name: cardBack.name,
          text: cardBack.text,
          image: cardBack.image
        }));
        this.totalPages = data.pageCount;
        this.currentPage = data.page;
        this.loading = false; // Ustawienie stanu ładowania na false po pobraniu danych
      },
      (error) => {
        console.error('Error fetching card backs:', error);
        this.loading = false; // Ustawienie stanu ładowania na false w przypadku błędu
        this.error = true; // Ustawienie stanu błędu na true
      }
    );
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.loadCardBacks(this.currentPage);
  }
}
