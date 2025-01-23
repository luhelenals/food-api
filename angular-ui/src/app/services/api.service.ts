import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReceitaResponse } from '../interfaces/receita';
import { IngredienteResponse } from '../interfaces/ingrediente';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly baseUrl = 'http://localhost:5077/api';

  constructor(private http: HttpClient) {
    this.getIngredientes();
    this.getReceitas();
    this.getReceitasCompativeis();
  }

  // Método para buscar receitas
  getReceitas(): Observable<ReceitaResponse> {
    return this.http.get<ReceitaResponse>(`${this.baseUrl}/receita`);
  }

  // Método para buscar receitas compatíveis
  getReceitasCompativeis(): Observable<ReceitaResponse> {
    return this.http.get<ReceitaResponse>(`${this.baseUrl}/ingrediente/receitas`);
  }

  // Método para buscar ingredientes
  getIngredientes(): Observable<IngredienteResponse> {
    return this.http.get<IngredienteResponse>(`${this.baseUrl}/ingrediente`);
  }
}
