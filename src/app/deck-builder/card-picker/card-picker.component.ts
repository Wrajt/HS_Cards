import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {ApiService} from "../../api.service";
import {PaginatorComponent} from "../../paginator/paginator.component";

@Component({
  selector: 'app-card-picker',
  templateUrl: './card-picker.component.html',
  standalone: true,
  imports: [
    NgForOf,
    TitleCasePipe,
    NgIf,
    PaginatorComponent
  ],
  styleUrls: ['./card-picker.component.css']
})
export class CardPickerComponent implements OnInit {
  classNames = ['warrior', 'mage', 'druid', 'hunter', 'paladin', 'priest', 'rogue', 'shaman', 'warlock', 'neutral'];
  selectedClass: string = '';
  classCards: any[] = [];
  cards: any[] = [];
  filteredCards: any[] = [];


  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  onClassChange(event: Event): void {
    this.selectedClass = (event.target as HTMLSelectElement).value;
    this.loadCards();
  }

  loadCards(): void {
    this.apiService.getCardInfo(1, 40,this.selectedClass).subscribe((data: any) => {
      this.classCards = data.cards;
      const seen = new Set();
      this.cards = this.classCards.filter((card) => {
        const name = card.name;
        const duplicate = seen.has(name);
        seen.add(name);
        return !duplicate;
      });
    });
  }

  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredCards = this.cards.filter(card => card.name.toLowerCase().includes(searchTerm));
  }
}
