import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { ApiService } from '../../services/api.service';
import { Ingrediente } from '../../interfaces/ingrediente';
import { CommonModule } from '@angular/common';
import { IngredienteService } from '../../services/ingrediente.service';

@Component({
  selector: 'app-ingredientes',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './ingredientes.component.html',
  styleUrl: './ingredientes.component.scss'
})
export class IngredientesComponent implements OnInit{
  ingredientes: Ingrediente[] = [];
  novoIngrediente: Ingrediente = { nome: '', emEstoque: false }; // Estrutura inicial de um ingrediente

  constructor(private ingredienteService: IngredienteService, cdr: ChangeDetectorRef) {}
  
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
}
