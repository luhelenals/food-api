import { Component, Input } from '@angular/core';
import { ReceitaService } from '../../services/receita/receita.service';
import { ReceitaRequest } from '../../interfaces/receita';
import { FormService } from '../../services/form/form.service';
import { ButtonComponent } from '../button/button.component';
import { FormsModule } from '@angular/forms';
import { IngredientesComponent } from '../ingredientes/ingredientes.component';

@Component({
  selector: 'app-receita-form',
  standalone: true,
  imports: [ButtonComponent, FormsModule, IngredientesComponent],
  templateUrl: './receita-form.component.html',
  styleUrl: './receita-form.component.scss',
})
export class ReceitaFormComponent {
  formData: ReceitaRequest = { titulo: '', descricao: '', idIngredientes: [] };
  formVisible: boolean = false;
  id!: number;
  @Input('form-type') formType: FormType = "create";

  constructor(
    private formService: FormService,
    private receitaService: ReceitaService
  ) {
    // Visibilidade do form
    this.formService.formVisibility$.subscribe((visible) => {
      this.formVisible = visible;
    });

    // ID do item
    this.formService.formData$.subscribe((id) => {
      if (id) {
        this.loadReceitaData(id);
      }
    });

    // Tipo do formulário
    this.formService.formType$.subscribe((type) => {
      this.formType = type;
    });
  }

  // Carregar informações do item pelo ID
  loadReceitaData(id: number): void {
    this.receitaService.getReceitaById(id).subscribe((receita) => {
      this.formData = <ReceitaRequest>{ titulo: receita.titulo, descricao: receita.descricao, idIngredientes: receita.idIngredientes };
      this.id = receita.id;
    });
  }

  openForm(): void {
    this.formVisible = true;
  }

  closeForm(): void {
    this.formService.closeForm();
  }

  OnSubmit(): void {
    if (this.formType === 'create')
      this.criarReceita();
    else this.editarReceita();
  }

  // Criar novo
  criarReceita() {
    if (this.formData.titulo.trim()) {
      this.receitaService.postReceita(this.formData);
      this.formService.closeForm();
    } else {
      console.warn('O título não pode estar vazio.');
    }
  }

  // Editar item
  editarReceita() {
    this.receitaService.updateReceita(this.id, this.formData);
  }

  // Seleção de ingredientes por ID
  onIngredientesSelecionados(ids: number[]): void {
    this.formData.idIngredientes = ids;
  }
}
