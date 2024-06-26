import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CardBacksComponent } from './card-backs/card-backs.component';
import { CardInfoComponent} from "./card-info/card-info.component";
import { DeckBuilderComponent} from "./deck-builder/deck-builder.component";

export const routes: Routes = [
  {path: 'home', component: HomeComponent, pathMatch: 'full'},
  {path: 'card-backs', component: CardBacksComponent, pathMatch: 'full'},
  {path: 'card-info', component: CardInfoComponent, pathMatch: 'full'},
  {path: 'deck-builder', component: DeckBuilderComponent, pathMatch: 'full'},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];
