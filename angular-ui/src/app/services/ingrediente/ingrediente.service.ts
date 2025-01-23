import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { BehaviorSubject, catchError } from 'rxjs';
import { Ingrediente, IngredienteRequest } from '../../interfaces/ingrediente';

@Injectable({
  providedIn: 'root',
})
export class IngredienteService {
  private ingredientesSubject = new BehaviorSubject<Ingrediente[]>([]);
  ingredientes$ = this.ingredientesSubject.asObservable();

  constructor(private apiService: ApiService) {}

  // Método para buscar todos os ingredientes
  fetchIngredientes() {
    this.apiService.getIngredientes().subscribe({
      next: (ingredientes) => {
        this.ingredientesSubject.next(ingredientes.$values || []);
      },
      error: (err) => console.error('Erro ao carregar ingredientes:', err),
    });
  }

  // Método para postar um novo ingrediente
  postIngrediente(ingrediente: IngredienteRequest) {
    this.apiService.postIngrediente(ingrediente).subscribe({
      next: (newIngrediente) => {
        // Atualiza a lista de ingredientes localmente
        const updatedIngredientes = [
          ...this.ingredientesSubject.getValue(),
          newIngrediente,
        ];
        this.ingredientesSubject.next(updatedIngredientes);

        console.log('Ingrediente adicionado com sucesso:', newIngrediente);
      },
      error: (err) => {
        console.error('Erro ao adicionar ingrediente:', err);
      },
    });
  }

  deleteIngrediente(id: number) {
    this.apiService.deleteIngrediente(id).subscribe({
      next: (res) => this.ingredientesSubject.next(res.$values || []),
      error: (err) => console.error('Erro ao deletar ingrediente:', err),
    });
  }
}
