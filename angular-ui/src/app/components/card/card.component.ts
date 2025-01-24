import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IngredienteService } from '../../services/ingrediente/ingrediente.service';
import { ReceitaService } from '../../services/receita/receita.service';
import { ReceitaFormComponent } from '../receita-form/receita-form.component';
import { IngredienteFormComponent } from '../ingrediente-form/ingrediente-form.component';
import { FormService } from '../../services/form/form.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input("card-title") cardTitle: string = "";
  @Input("card-info") info: string = "";
  @Input("card-type") cardType: CardType = "receita";
  @Input("item-id") itemId!: string | number; // ID do item (ingrediente ou receita)

  constructor(private ingredienteService: IngredienteService, private receitaService: ReceitaService, private formService: FormService) {}

  onCardClick(deleteButton: boolean): void {
    if (this.cardType === 'receita') {
      if (deleteButton) {
        console.log("Deletar receita com ID:", this.itemId);
        this.receitaService.deleteReceita(Number(this.itemId));
      } else {
        this.formService.openForm("edit", this.cardType, Number(this.itemId));
      }
    } else if (this.cardType === 'ingrediente') {
      console.log('ingrediente card');
      if (deleteButton) {
        console.log("Deletar ingrediente com ID:", this.itemId);
        this.ingredienteService.deleteIngrediente(Number(this.itemId));
      } else {
        this.formService.openForm("edit", this.cardType, Number(this.itemId));
      }
    }
  }
}
