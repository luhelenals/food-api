import { Component, OnInit, inject } from '@angular/core';
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
export class ReceitasComponent implements OnInit{
  
  receitas: Receita[] = [];
  private apiService = inject(ApiService);
  
  ngOnInit(): void {
    this.getReceitas();
  }

  getReceitas() {
    this.apiService.getReceitas().subscribe({
      next: (res) => {
        this.receitas = res.$values;
      },
      error: (error: any) => console.error('Erro ao carregar receitas:', error),
    })
  }
}
