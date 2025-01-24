import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Receita, ReceitaRequest } from '../../interfaces/receita';
import { ApiService } from '../api/api.service';

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

  getReceitaById(id: number) {
    return this.apiService.getReceitaById(id);
  }

  postReceita(receita: ReceitaRequest) {
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

  deleteReceita(id: number) {
    this.apiService.deleteReceita(id).subscribe({
      next: (res) => this.receitasSubject.next(res.$values || []),
      error: (err) => console.error('Erro ao deletar receita:', err),
    });
  }

  // Método para editar receita
  updateReceita(id: number, receita: ReceitaRequest) {
    this.apiService.updateReceita(id, receita).subscribe({
      next: (newReceita) => {
        console.log('Receita editada com sucesso:', newReceita);
      },
      error: (err) => {
        console.error('Erro ao editar receita:', err);
      },
    });
  }
}
