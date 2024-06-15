import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from "../api.service";
import { CommonModule, NgForOf } from '@angular/common';
import { MatTab, MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { Card } from '../interfaces/card-data.interface';

@Component({
  selector: 'app-card-info',
  standalone: true,
  imports: [NgForOf, CommonModule, MatTabGroup, MatTab, MatTabsModule],
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.css']
})
export class CardInfoComponent implements OnInit {
  @Input() label: string = '';

  allCards: Card[] = [];
  warriorCards: Card[] = [];
  druidCards: Card[] = [];
  hunterCards: Card[] = [];
  mageCards: Card[] = [];
  paladinCards: Card[] = [];
  priestCards: Card[] = [];
  rogueCards: Card[] = [];
  shamanCards: Card[] = [];
  warlockCards: Card[] = [];
  neutralCards: Card[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getAllCards().subscribe((cards: Card[]) => {
      console.log('Total cards fetched:', cards.length);
      this.allCards = cards;
      this.filterAndSortCards();
    });
  }

  filterAndSortCards(): void {
    this.warriorCards = this.sortByManaCost(this.getUniqueCards(this.allCards.filter(card => card.classId === 10)));
    this.druidCards = this.sortByManaCost(this.getUniqueCards(this.allCards.filter(card => card.classId === 2)));
    this.hunterCards = this.sortByManaCost(this.getUniqueCards(this.allCards.filter(card => card.classId === 3)));
    this.mageCards = this.sortByManaCost(this.getUniqueCards(this.allCards.filter(card => card.classId === 4)));
    this.paladinCards = this.sortByManaCost(this.getUniqueCards(this.allCards.filter(card => card.classId === 5)));
    this.priestCards = this.sortByManaCost(this.getUniqueCards(this.allCards.filter(card => card.classId === 6)));
    this.rogueCards = this.sortByManaCost(this.getUniqueCards(this.allCards.filter(card => card.classId === 7)));
    this.shamanCards = this.sortByManaCost(this.getUniqueCards(this.allCards.filter(card => card.classId === 8)));
    this.warlockCards = this.sortByManaCost(this.getUniqueCards(this.allCards.filter(card => card.classId === 9)));
    this.neutralCards = this.sortByManaCost(this.getUniqueCards(this.allCards.filter(card => card.classId === 12)));
  }

  getUniqueCards(cards: Card[]): Card[] {
    const uniqueNames = new Set();
    return cards.filter(card => {
      if (!uniqueNames.has(card.name)) {
        uniqueNames.add(card.name);
        return true;
      }
      return false;
    });
  }

  sortByManaCost(cards: Card[]): Card[] {
    return cards.sort((a, b) => a.manaCost - b.manaCost);
  }
}
