import { Component } from '@angular/core';
import { ReceitasComponent } from "../receitas/receitas.component";
import { IngredientesComponent } from "../ingredientes/ingredientes.component";
import { ButtonComponent } from "../button/button.component";
import { ReceitaService } from '../../services/receita/receita.service';
import { IngredienteService } from '../../services/ingrediente/ingrediente.service';
import { Ingrediente } from '../../interfaces/ingrediente';
import { Receita } from '../../interfaces/receita';
import { IngredienteFormComponent } from "../ingrediente-form/ingrediente-form.component";
import { ReceitaFormComponent } from '../receita-form/receita-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReceitasComponent, IngredientesComponent, ButtonComponent, IngredienteFormComponent, ReceitaFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent { 
  constructor(private receitaService: ReceitaService, private ingredienteService: IngredienteService) {}

  OnButtonClick(type: string) {
    switch(type) {
      case 'Nova Receita':
      {
        this.receitaService.postReceita(<Receita>{'titulo': 'Pão de Queijo', 'descricao': 'é pão e tem queijo', 'idIngredientes': [1, 2]});
      }break;
      case 'Novo Ingrediente':
      {
        this.ingredienteService.postIngrediente(<Ingrediente>{'nome': 'alface', 'emEstoque': false});
      }break;
    }
  }
}
