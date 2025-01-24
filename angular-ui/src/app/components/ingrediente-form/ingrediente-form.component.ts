import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { IngredienteRequest } from '../../interfaces/ingrediente';
import { IngredienteService } from '../../services/ingrediente/ingrediente.service';
import "../../custom-types";
import { FormService } from '../../services/form/form.service';

@Component({
  selector: 'app-ingrediente-form',
  standalone: true,
  imports: [FormsModule, ButtonComponent],
  templateUrl: './ingrediente-form.component.html',
  styleUrl: './ingrediente-form.component.scss'
})
export class IngredienteFormComponent {
  @Input('form-type') formType: FormType = "create";
  @Input('form-fields') fields: string[] = [];
  @Input() id!: number; // ID of the item being updated

  formData: IngredienteRequest = { nome: '', emEstoque: false }; // Estrutura inicial de um ingrediente
constructor(
    private formService: FormService,
    private ingredienteService: IngredienteService
  ) {
    // Subscribe to form visibility
    this.formService.formVisibility$.subscribe((visible) => {
      this.formVisible = visible;
    });

    // Subscribe to form data (ID)
    this.formService.formData$.subscribe((id) => {
      if (id) {
        this.loadIngredienteData(id);
      }
    });

    // Subscribe to form type
    this.formService.formType$.subscribe((type) => {
      this.formType = type;
    });
  }

  formVisible: boolean = false; // Estado para controlar a visibilidade do pop-up

  openForm(): void {
    this.formVisible = true;
  }

  closeForm(): void {
    this.formService.closeForm();
  }
  
  // Carregar dados do item para popular o form
  loadIngredienteData(id: number): void {
    this.ingredienteService.getIngredienteById(id).subscribe((ingrediente) => {
      this.formData = { ...ingrediente };
    });
  }

  OnSubmit(){
    if(this.formType === 'create') this.adicionarIngrediente();
    else this.editarIngrediente();
  }

  editarIngrediente() {
    this.ingredienteService.updateIngrediente(this.id, this.formData);
    this.closeForm();
  }

  adicionarIngrediente() {
    if (this.formData.nome.trim()) {
      this.ingredienteService.postIngrediente(this.formData);
      this.closeForm();
    } else {
      console.warn('O nome do ingrediente não pode estar vazio.');
    }
  }
}
