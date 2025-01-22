import { ChangeDetectorRef, Component } from '@angular/core';
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
export class IngredientesComponent {
  ingredientes: Ingrediente[] = [];

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {
    const observer = {
      next: (data: any) => {
        this.ingredientes = data.$values;
        console.log('Ingredientes carregados:', this.ingredientes);
        this.cdr.detectChanges();
      },
      error: (error: any) => console.error('Erro ao carregar Ingredientes:', error),
      complete: () => console.log('Requisição concluída.')
    };

    this.apiService.getIngredientes().subscribe(observer);
  }
}
