import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { ApiService } from '../../services/api.service';
import { Receita } from '../../interfaces/receita';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-receitas',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './receitas.component.html',
  styleUrl: './receitas.component.scss'
})
export class ReceitasComponent {
  receitas: Receita[] = [];

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {
    const observer = {
      next: (data: any) => {
        this.receitas = data.$values;
        console.log('Receitas carregadas:', this.receitas);
        this.cdr.detectChanges();
      },
      error: (error: any) => console.error('Erro ao carregar receitas:', error),
      complete: () => console.log('Requisição concluída.')
    };

    this.apiService.getReceitas().subscribe(observer);
  }
}
