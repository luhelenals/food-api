import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import '../../custom-types';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private formVisibility = new BehaviorSubject<boolean>(false);
  private formData = new BehaviorSubject<number | null>(null);
  private formType = new BehaviorSubject<FormType>('create');
  private formGroup = new BehaviorSubject<CardType>('receita');

  // Observables
  formVisibility$ = this.formVisibility.asObservable();
  formData$ = this.formData.asObservable();
  formType$ = this.formType.asObservable();
  formGroup$ = this.formGroup.asObservable();

  openForm(type: FormType, group: CardType, id?: number): void {
    this.formGroup.next(group);
    this.formType.next(type);
    this.formData.next(id || null);
    this.formVisibility.next(true);
  }

  closeForm(): void {
    this.formVisibility.next(false);
  }
}
