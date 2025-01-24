import { Component, ViewChild } from '@angular/core';
import { ReceitaFormComponent } from '../receita-form/receita-form.component';
import { IngredienteFormComponent } from '../ingrediente-form/ingrediente-form.component';
import { ReceitasComponent } from '../receitas/receitas.component';
import { IngredientesComponent } from '../ingredientes/ingredientes.component';
import { ButtonComponent } from '../button/button.component';
import { FormService } from '../../services/form/form.service';
import { FormContainerComponent } from '../form-container/form-container.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReceitaFormComponent, IngredienteFormComponent, ReceitasComponent, IngredientesComponent, ButtonComponent, FormContainerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private formService: FormService) {}

  @ViewChild(ReceitaFormComponent) receitaFormComponent!: ReceitaFormComponent;
  @ViewChild(IngredienteFormComponent) ingredienteFormComponent!: IngredienteFormComponent;

  OnButtonClick(type: string) {
    switch (type) {
      case 'Nova Receita': {
        this.formService.openForm("create", "receita");
        break;
      }
      case 'Novo Ingrediente': {
        this.formService.openForm("create", "ingrediente");
        break;
      }
    }
  }
}
