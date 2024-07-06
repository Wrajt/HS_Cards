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
  cardBacks: any[] = [];
  currentPage: number = 1;
  pageSize: number = 18;
  totalPages: number = 1;
  loading: boolean = false;
  error: boolean = false;


  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadCardBacks();
  }

  loadCardBacks(page: number = this.currentPage, pageSize: number = this.pageSize): void {
    this.loading = true; //

    this.apiService.getCardBacks(page, pageSize).subscribe(
      (data: any) => {
        this.cardBacks = data.cardBacks.map((cardBack: any) => ({
          name: cardBack.name,
          text: cardBack.text,
          image: cardBack.image
        }));
        this.totalPages = data.pageCount;
        this.currentPage = data.page;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching card backs:', error);
        this.loading = false;
        this.error = true;
      }
    );
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.loadCardBacks(this.currentPage);
  }
}
