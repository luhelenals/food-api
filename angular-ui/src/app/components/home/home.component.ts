import { Component } from '@angular/core';
import { ReceitasComponent } from "../receitas/receitas.component";
import { IngredientesComponent } from "../ingredientes/ingredientes.component";
import { ButtonComponent } from "../button/button.component";
import { ReceitaService } from '../../services/receita.service';
import { IngredienteService } from '../../services/ingrediente.service';
import { Ingrediente } from '../../interfaces/ingrediente';
import { Receita } from '../../interfaces/receita';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReceitasComponent, IngredientesComponent, ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent { 
  constructor(private receitaService: ReceitaService, private ingredienteService: IngredienteService) {}

  OnButtonClick(type: string) {
    switch(type) {
      case 'Nova Receita':
      {
        console.log('receitaaaa');
        this.receitaService.postReceita(<Receita>{'titulo': 'Pão de Queijo', 'descricao': 'é pão e tem queijo', 'idIngredientes': [1, 2]});
      }break;
      case 'Novo Ingrediente':
      {
        this.ingredienteService.postIngrediente(<Ingrediente>{'nome': 'alface', 'emEstoque': false});
      }break;
    }
  }
}
