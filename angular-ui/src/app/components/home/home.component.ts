import { Component, ViewChild } from '@angular/core';
import { ReceitaFormComponent } from '../receita-form/receita-form.component';
import { IngredienteFormComponent } from '../ingrediente-form/ingrediente-form.component';
import { ReceitasComponent } from '../receitas/receitas.component';
import { IngredientesComponent } from '../ingredientes/ingredientes.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReceitaFormComponent, IngredienteFormComponent, ReceitasComponent, IngredientesComponent, ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  @ViewChild(ReceitaFormComponent) receitaFormComponent!: ReceitaFormComponent;
  @ViewChild(IngredienteFormComponent) ingredienteFormComponent!: IngredienteFormComponent;

  OnButtonClick(type: string) {
    switch (type) {
      case 'Nova Receita': {
        this.receitaFormComponent.abrirForm();
        break;
      }
      case 'Novo Ingrediente': {
        this.ingredienteFormComponent.abrirForm();
        break;
      }
    }
  }
}
