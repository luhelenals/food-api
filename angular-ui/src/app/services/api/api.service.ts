import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Receita, ReceitaRequest, ReceitaResponse } from '../../interfaces/receita';
import { Ingrediente, IngredienteRequest, IngredienteResponse } from '../../interfaces/ingrediente';

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

  // Método para oter receita por id
  getReceitaById(id: number): Observable<Receita> {
    return this.http.get<Receita>(`${this.baseUrl}/receita/${id}`);
  }

  // Método para adicionar receitas
  postReceita(receita: ReceitaRequest): Observable<Receita> {
    return this.http.post<Receita>(`${this.baseUrl}/receita`, receita);
  }

  // Método para buscar receitas compatíveis
  getReceitasCompativeis(): Observable<ReceitaResponse> {
    return this.http.get<ReceitaResponse>(`${this.baseUrl}/ingrediente/receitas`);
  }

  // Método para deletar receitas
  deleteReceita(id: number): Observable<ReceitaResponse> {
    return this.http.delete<ReceitaResponse>(`${this.baseUrl}/receita/delete/${id}`);
  }

  // Método para editar receita
  updateReceita(id: number, receita: ReceitaRequest): Observable<ReceitaResponse> {
    return this.http.put<ReceitaResponse>(`${this.baseUrl}/receita/${id}`, receita);
  }

  // Método para buscar ingredientes
  getIngredientes(): Observable<IngredienteResponse> {
    return this.http.get<IngredienteResponse>(`${this.baseUrl}/ingrediente`);
  }

  // Método para adicionar ingredientes
  postIngrediente(ingrediente: IngredienteRequest): Observable<Ingrediente> {
    return this.http.post<Ingrediente>(`${this.baseUrl}/ingrediente`, ingrediente);
  }

  // Método para deletar ingredientes
  deleteIngrediente(id: number): Observable<IngredienteResponse> {
    return this.http.delete<IngredienteResponse>(`${this.baseUrl}/ingrediente/delete/${id}`);
  }

  // Método para editar ingrediente
  updateIngrediente(id: number, ingrediente: IngredienteRequest): Observable<IngredienteResponse> {
    return this.http.put<IngredienteResponse>(`${this.baseUrl}/ingrediente/${id}`, ingrediente);
  }

  // Método para oter ingrediente por id
  getIngredienteById(id: number): Observable<Ingrediente> {
    return this.http.get<Ingrediente>(`${this.baseUrl}/ingrediente/${id}`);
  }
}
