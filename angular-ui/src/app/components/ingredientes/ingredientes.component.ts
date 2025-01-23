import { Component, OnInit, inject } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { ApiService } from '../../services/api.service';
import { Ingrediente } from '../../interfaces/ingrediente';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ingredientes',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './ingredientes.component.html',
  styleUrl: './ingredientes.component.scss'
})
export class IngredientesComponent implements OnInit{
  
  ingredientes: Ingrediente[] = [];
  private apiService = inject(ApiService);
  
  ngOnInit(): void {
    this.getIngredientes();
  }

  getIngredientes() {
    this.apiService.getIngredientes().subscribe({
      next: (res) => {
        this.ingredientes = res.$values;
      },
      error: (error: any) => console.error('Erro ao carregar ingredientes:', error),
    })
  }
}
