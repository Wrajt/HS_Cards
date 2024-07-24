import {Component, ViewChild} from '@angular/core';
import {NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {PaginatorComponent} from "../../paginator/paginator.component";
import {CardsDisplayComponent} from "../../cards-display/cards-display.component";

@Component({
  selector: 'app-card-picker',
  templateUrl: './card-picker.component.html',
  standalone: true,
  imports: [
    NgForOf,
    TitleCasePipe,
    NgIf,
    PaginatorComponent,
    CardsDisplayComponent
  ],
  styleUrls: ['./card-picker.component.css']
})
export class CardPickerComponent {
  classNames = ['warrior', 'mage', 'druid', 'hunter', 'paladin', 'priest', 'rogue', 'shaman', 'warlock', 'neutral'];
  selectedClass: string = '';

  cards: any[] = [];
  filteredCards: any[] = [];

  @ViewChild('cardsDisplay') cardsDisplay!: CardsDisplayComponent;

  onClassChange(event: Event): void {
    this.selectedClass = (event.target as HTMLSelectElement).value;
    this.cardsDisplay.loadCardInfo(1, this.cardsDisplay.pageSize, this.selectedClass);
  }

  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredCards = this.cards.filter(card => card.name.toLowerCase().includes(searchTerm));
  }
}
