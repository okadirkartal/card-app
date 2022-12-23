import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Card } from '../../models/card';
import { CardModalComponent } from '../card-modal/card-modal.component';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styles: [
    `
      .card-item {
        margin-bottom: 30px;
      }

      .mat-card-header {
        cursor: pointer;
      }
    `,
  ],
})
export class CardItemComponent {
  @Input() card!: Card;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openUpdateCardModal(card: Card): void {
    this.dialog.open(CardModalComponent, {
      width: '400px',
      data: card,
    });
  }
}
