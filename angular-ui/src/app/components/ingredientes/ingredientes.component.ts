import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Ingrediente, IngredienteRequest } from '../../interfaces/ingrediente';
import { CommonModule } from '@angular/common';
import { IngredienteService } from '../../services/ingrediente/ingrediente.service';

@Component({
  selector: 'app-ingredientes',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './ingredientes.component.html',
  styleUrl: './ingredientes.component.scss'
})
export class IngredientesComponent implements OnInit{
  ingredientes: Ingrediente[] = [];
  novoIngrediente: IngredienteRequest = { nome: '', emEstoque: false }; // Estrutura inicial de um ingrediente

  constructor(private ingredienteService: IngredienteService) {}
  
  ngOnInit(): void {
    this.getIngredientes();
  }

  getIngredientes() {
    this.ingredienteService.ingredientes$.subscribe((ingredientes) => {
      this.ingredientes = ingredientes;
    });

    this.ingredienteService.fetchIngredientes();
  }

  adicionarIngrediente() {
    if (this.novoIngrediente.nome.trim()) {
      this.ingredienteService.postIngrediente(this.novoIngrediente);
      this.novoIngrediente = { nome: '', emEstoque: false }; // Resetar o formulário
    } else {
      console.warn('O nome do ingrediente não pode estar vazio.');
    }
  }

  ToNumber(num: string) {
    return Number(num);
  }
}
