import { Component, OnInit } from '@angular/core';
import { ApiService} from "../api.service";
import { CommonModule, NgForOf } from '@angular/common';
@Component({
  selector: 'app-card-info',
  standalone: true,
  imports: [NgForOf, CommonModule],
  templateUrl: './card-info.component.html',
  styleUrl: './card-info.component.css'
})
export class CardInfoComponent implements OnInit{



  ngOnInit() {
  }
}
