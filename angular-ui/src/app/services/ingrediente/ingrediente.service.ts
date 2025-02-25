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

  // Método para obter ingrediente por um ID
  getIngredienteById(id: number) {
    return this.apiService.getIngredienteById(id);
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

  // Método para editar ingrediente
  updateIngrediente(id: number, ingrediente: IngredienteRequest) {
    this.apiService.updateIngrediente(id, ingrediente).subscribe({
      next: (response) => {
        console.log('Ingrediente editado com sucesso:', response);

        // Se a resposta da API vier com $values, extrai as receitas corretamente
        const updatedIngrediente = (response as any).$values ? (response as any).$values[0] : response;
    
        // Atualiza a receita dentro do array localmente
        const updatedIngredientes = this.ingredientesSubject.getValue().map(r =>
          r.id === id ? { ...updatedIngrediente } : r
        );
  
        // Notifica os componentes sobre a mudança
        this.ingredientesSubject.next(updatedIngredientes);
      },
      error: (err) => {
        console.error('Erro ao editar ingrediente:', err);
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
