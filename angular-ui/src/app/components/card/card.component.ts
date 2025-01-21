import { Component, Input, Output, EventEmitter } from '@angular/core';

// ingrediente => botão (em estoque => sem estoque)
type CardVariants = "receita" | "ingrediente";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input("card-title") cardTitle: string = "";
  @Input() variant: CardVariants="receita";

  onCardClick():void {
    console.log("card clicou");
  }
}
