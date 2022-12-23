import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Card } from '../models/card';
import { CardService } from '../services/card.service';
import { CardModalComponent } from './card-modal/card-modal.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
})
export class CardsComponent {
  constructor(public dialog: MatDialog, public cardService: CardService) {}

  ngOnInit(): void {
    this.cardService.getCards();
  }

  openAddCardModal(): void {
    const dialog = this.dialog.open(CardModalComponent, {
      width: '400px',
    });
  }
}
