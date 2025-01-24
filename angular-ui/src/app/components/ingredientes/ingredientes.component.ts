import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Ingrediente } from '../../interfaces/ingrediente';
import { CommonModule } from '@angular/common';
import { IngredienteService } from '../../services/ingrediente/ingrediente.service';

@Component({
  selector: 'app-ingredientes',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './ingredientes.component.html',
  styleUrl: './ingredientes.component.scss'
})
export class IngredientesComponent implements OnInit {
  @Input("form-selection") formSelection: boolean = false;
  @Input() selectedIngredients: number[] = [];
  @Output() ingredientesSelecionados = new EventEmitter<number[]>();

  ingredientes: Ingrediente[] = [];
  idsSelecionados: number[] = [];

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

  toggleSelecionado(id: number): void {
    if (this.idsSelecionados.includes(id)) {
      this.idsSelecionados = this.idsSelecionados.filter((selecionado) => selecionado !== id);
    } else {
      this.idsSelecionados.push(id);
    }
    this.ingredientesSelecionados.emit(this.idsSelecionados);
  }

  isSelecionado(id: number): boolean {
    return this.idsSelecionados.includes(id);
  }
}
