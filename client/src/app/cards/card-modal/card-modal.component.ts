import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styles: [
    `
      .example-form {
        min-width: 150px;
        max-width: 500px;
        width: 100%;
      }

      .example-full-width {
        width: 100%;
      }
    `,
  ],
})
export class CardModalComponent {
  cardForm!: FormGroup;
  showSpinner: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<CardModalComponent>,
    private fb: FormBuilder,
    private cardService: CardService,
    private _snackBar: MatSnackBar,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: Card
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.cardForm = this.fb.group({
      name: [this.data?.name || '', Validators.maxLength(50)],
      title: [
        this.data?.title || '',
        [Validators.required, Validators.maxLength(255)],
      ],
      phone: [
        this.data?.phone || '',
        [Validators.required, Validators.maxLength(20)],
      ],
      email: [
        this.data?.email || '',
        [Validators.email, Validators.maxLength(50)],
      ],
      address: [this.data?.address || '', Validators.maxLength(255)],
    });
  }

  addCard(): void {
    this.showSpinner = true;
    this.cardService.addCard(this.cardForm.value).subscribe(
      (res: any) => {
        this.getSuccess(res || 'Card updated successfully');
      },
      (err: any) => {
        this.getError(err);
      }
    );
  }

  editCard(): void {
    this.showSpinner = true;
    this.cardService.editCard(this.cardForm.value, this.data._id).subscribe(
      (res: any) => {
        this.getSuccess(res || 'Card updated successfully');
      },
      (err: any) => {
        this.getError(err);
      }
    );
  }

  deleteCard(): void {
    this.showSpinner = true;
    this.cardService.deleteCard(this.data._id).subscribe(
      (res: any) => {
        this.getSuccess(res || 'Card deleted successfully');
      },
      (err: any) => {
        this.getError(err);
      }
    );
  }

  getSuccess(message: string): void {
    this.snackbarService.createSnackbar('success', message);
    this.cardService.getCards();
    this.showSpinner = false;
    this.dialogRef.close();
  }

  getError(message: string): void {
    this.snackbarService.createSnackbar('error', message);
    this.showSpinner = false;
  }
}
