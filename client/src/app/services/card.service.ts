import { Inject, Injectable } from '@angular/core';
import { Card } from '../models/card';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  cards!: Card[];
  filteredCards!: Card[];

  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private http: HttpClient
  ) {}

  getCards(): void {
    this.http.get<Card[]>(`${this.apiUrl}`).subscribe((res: any) => {
      this.cards = this.filteredCards = res.cards;
    });
  }

  addCard(card: any) {
    return this.http.post(`${this.apiUrl}`, card);
  }

  editCard(card: Card, cardId: string) {
    return this.http.put(`${this.apiUrl}/${cardId}`, card);
  }

  deleteCard(cardId: string) {
    return this.http.delete(`${this.apiUrl}/${cardId}`);
  }
}
