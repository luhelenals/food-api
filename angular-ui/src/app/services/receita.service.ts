import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Receita } from '../interfaces/receita';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {
  private receitasSubject = new BehaviorSubject<Receita[]>([]);
  receitas$ = this.receitasSubject.asObservable(); // Observable for other components to subscribe to

  constructor(private apiService: ApiService) {}

  fetchReceitas() {
    this.apiService.getReceitas().subscribe({
      next: (res) => this.receitasSubject.next(res.$values || []),
      error: (err) => console.error('Erro ao carregar receitas:', err),
    });
  }

  fetchReceitasCompativeis() {
    this.apiService.getReceitasCompativeis().subscribe({
      next: (res) => this.receitasSubject.next(res.$values || []),
      error: (err) => console.error('Erro ao carregar receitas compatíveis:', err),
    });
  }
}
