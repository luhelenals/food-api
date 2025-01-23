import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Receita } from '../interfaces/receita';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {
  private receitasSubject = new BehaviorSubject<Receita[]>([]);
  receitas$ = this.receitasSubject.asObservable();

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

  postReceita(receita: Receita) {
    this.apiService.postReceita(receita).subscribe({
      next: (newReceita) => {
        // Atualiza a lista de receitas localmente
        const updatedReceitas = [
          ...this.receitasSubject.getValue(),
          newReceita,
        ];
        this.receitasSubject.next(updatedReceitas);

        console.log('Receita adicionada com sucesso:', newReceita);
      },
      error: (err) => {
        console.error('Erro ao adicionar receita:', err);
      },
    });
  }
}
