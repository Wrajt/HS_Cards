import { Component, Input } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-loading-container',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './loading-container.component.html',
  styleUrl: './loading-container.component.css'
})
export class LoadingContainerComponent {
  @Input() loading: boolean = false;
  @Input() error: boolean = false;
}
