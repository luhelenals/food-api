import { Component, Input } from '@angular/core';

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
