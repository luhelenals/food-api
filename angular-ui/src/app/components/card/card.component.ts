import { Component, Input, Output, EventEmitter } from '@angular/core';

// ingrediente => botão (em estoque => sem estoque)

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input("card-title") cardTitle: string = "";
  @Input("card-info") info: string = "";

  onCardClick():void {
    console.log("card clicou");
  }
}
