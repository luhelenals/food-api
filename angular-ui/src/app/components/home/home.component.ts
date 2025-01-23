import { Component } from '@angular/core';
import { ReceitasComponent } from "../receitas/receitas.component";
import { IngredientesComponent } from "../ingredientes/ingredientes.component";
import { ButtonComponent } from "../button/button.component";
import { ReceitaService } from '../../services/receita.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReceitasComponent, IngredientesComponent, ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent { 
  constructor(private receitaService: ReceitaService) {}

  OnButtonClick(type: string) {
    switch(type) {
      case 'Receitas Compatíveis':
      {
        this.receitaService.fetchReceitasCompativeis();
      }break;
    }
  }
}
