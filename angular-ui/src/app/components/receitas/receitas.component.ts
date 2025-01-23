import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Receita } from '../../interfaces/receita';
import { CommonModule } from '@angular/common';
import { ReceitaService } from '../../services/receita/receita.service';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-receitas',
  standalone: true,
  imports: [CardComponent, CommonModule, ButtonComponent],
  templateUrl: './receitas.component.html',
  styleUrl: './receitas.component.scss'
})

export class ReceitasComponent implements OnInit{
  receitas: Receita[] = [];
  filter: boolean = false;

  constructor(private receitasService: ReceitaService) {}

  filterReceitas(): void {
    if(this.filter) {
      this.receitasService.fetchReceitas();
      this.filter = false;
    }
    else {
      this.receitasService.fetchReceitasCompativeis();
      this.filter = true;
    }
  }

  ngOnInit(): void {
    this.receitasService.receitas$.subscribe((receitas) => {
      this.receitas = receitas;
  });

  // Carregar receitas iniciais
  this.receitasService.fetchReceitas();
  }
}
