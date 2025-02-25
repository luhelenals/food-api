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
        this.id = id;  // Atualiza o ID do ingrediente a ser editado
        this.loadIngredienteData(id);
      }
    });

    // Subscribe to form type
    this.formService.formType$.subscribe((type) => {
      this.formType = type;
    });
  }

  ingredienteId: number | null = null;
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
    if (ingrediente) {
      this.ingredienteId = id;  // 🔹 Armazena o ID separado do formData
      this.formData = { nome: ingrediente.nome, emEstoque: ingrediente.emEstoque };
      console.log("Ingrediente carregado:", this.ingredienteId, this.formData);
    } else {
      console.warn("Nenhum ingrediente encontrado com o ID:", id);
    }
  });
}

  OnSubmit(){
    if(this.formType === 'create') this.adicionarIngrediente();
    else this.editarIngrediente();
  }

  editarIngrediente() {
    if (!this.ingredienteId) {
      console.error("Erro: Tentativa de editar um ingrediente sem ID válido.");
      return;
    }
  
    this.ingredienteService.updateIngrediente(this.ingredienteId, this.formData);
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
