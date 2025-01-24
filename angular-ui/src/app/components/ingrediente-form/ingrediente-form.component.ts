import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { IngredienteRequest } from '../../interfaces/ingrediente';
import { IngredienteService } from '../../services/ingrediente/ingrediente.service';

type FormType = "create" | "edit";

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

  formData: IngredienteRequest = { nome: '', emEstoque: false }; // Estrutura inicial de um ingrediente
  constructor(private ingredienteService: IngredienteService) {}

  formVisivel: boolean = false; // Estado para controlar a visibilidade do pop-up

  abrirForm(): void {
    this.formVisivel = true;
  }

  fecharForm(): void {
    this.formVisivel = false;
  }

  OnSubmit(){
    if(this.formType == "create") this.adicionarIngrediente();
    else this.editarIngrediente();
  }

  editarIngrediente() {

  }

  adicionarIngrediente() {
    if (this.formData.nome.trim()) {
      this.ingredienteService.postIngrediente(this.formData);
      this.formData = { nome: '', emEstoque: false }; // Resetar o formulário
    } else {
      console.warn('O nome do ingrediente não pode estar vazio.');
    }
    this.fecharForm();
  }
}
