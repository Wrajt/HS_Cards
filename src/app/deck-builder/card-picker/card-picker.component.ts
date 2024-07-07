import { Component } from '@angular/core';
import {NgForOf, TitleCasePipe} from "@angular/common";

@Component({
  selector: 'app-card-picker',
  templateUrl: './card-picker.component.html',
  standalone: true,
  imports: [
    NgForOf,
    TitleCasePipe
  ],
  styleUrls: ['./card-picker.component.css']
})
export class CardPickerComponent {
  classNames = ['warrior', 'mage', 'druid', 'hunter', 'paladin', 'priest', 'rogue', 'shaman', 'warlock'];

  constructor() {}

  onClassChange(event: Event) {
    const selectedClass = (event.target as HTMLSelectElement).value;
    console.log('Selected class:', selectedClass);

  }
}
