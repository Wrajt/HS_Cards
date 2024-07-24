import {Component, ViewChild} from '@angular/core';
import {CommonModule, NgForOf} from '@angular/common';
import {PaginatorComponent} from "../paginator/paginator.component";
import {LoadingContainerComponent} from "../loading-contaier/loading-container.component";
import {CardsDisplayComponent} from "../cards-display/cards-display.component";

@Component({
  selector: 'app-card-info',
  standalone: true,
  imports: [NgForOf, CommonModule, PaginatorComponent, LoadingContainerComponent, CardsDisplayComponent],
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.css']
})
export class CardInfoComponent {
  classNames: string[] = ['warrior', 'mage', 'druid', 'hunter', 'paladin', 'priest', 'rogue', 'shaman', 'warlock', 'neutral'];
  currentClass = 'warrior'

    @ViewChild('cardsDisplay') cardsDisplay!: CardsDisplayComponent;

  onClassChange(className: string): void {
    this.currentClass = className;
    this.cardsDisplay.loadCardInfo(1, this.cardsDisplay.pageSize, this.currentClass);

  }
}
