import { Component } from '@angular/core';
import {CardPickerComponent} from "./card-picker/card-picker.component";
import {DeckComponent} from "./deck/deck.component";

@Component({
  selector: 'app-deck-builder',
  standalone: true,
  imports: [
    CardPickerComponent,
    DeckComponent
  ],
  templateUrl: './deck-builder.component.html',
  styleUrl: './deck-builder.component.css'
})
export class DeckBuilderComponent {

}
