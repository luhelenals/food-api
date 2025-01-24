import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { FormsModule } from '@angular/forms';
import { ReceitaRequest } from '../../interfaces/receita';
import { ReceitaService } from '../../services/receita/receita.service';
import { IngredientesComponent } from '../ingredientes/ingredientes.component';

type FormType = "create" | "edit";

@Component({
  selector: 'app-receita-form',
  standalone: true,
  imports: [ButtonComponent, FormsModule, IngredientesComponent],
  templateUrl: './receita-form.component.html',
  styleUrl: './receita-form.component.scss'
})
export class ReceitaFormComponent {
  @Input('form-type') formType: FormType = "create";
  @Input('form-fields') fields: string[] = [];

  formData: ReceitaRequest = { titulo: '', descricao: '', idIngredientes:[] }; // Estrutura inicial de um ingrediente
  constructor(private receitaService: ReceitaService) {}

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

  onIngredientesSelecionados(ids: number[]): void {
    this.formData.idIngredientes = ids;
  }

  adicionarIngrediente() {
    if (this.formData.titulo.trim()) {
      this.receitaService.postReceita(this.formData);
      this.formData = { titulo: '', descricao: '', idIngredientes:[] }; // Resetar o formulário
    } else {
      console.warn('O título não pode estar vazio.');
    }
    this.fecharForm();
  }
}