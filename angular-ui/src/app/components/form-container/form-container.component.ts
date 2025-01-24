import { Component } from '@angular/core';
import { ReceitaFormComponent } from "../receita-form/receita-form.component";
import { IngredienteFormComponent } from '../ingrediente-form/ingrediente-form.component';
import { FormService } from '../../services/form/form.service';

@Component({
  selector: 'app-form-container',
  standalone: true,
  imports: [ReceitaFormComponent, IngredienteFormComponent],
  templateUrl: './form-container.component.html',
  styleUrl: './form-container.component.scss'
})
export class FormContainerComponent {
  formVisible: boolean = false;
  group: CardType = "receita";
  type: FormType = "create";

  constructor(private formService: FormService) {
    // Subscribe to form visibility
    this.formService.formVisibility$.subscribe((visible) => {
      this.formVisible = visible;
    });

    // Subscribe to form group (card type)
    this.formService.formGroup$.subscribe((group) => {
      this.group = group;
    });
  }

  closeForm(): void {
    this.formService.closeForm();
  }
}
