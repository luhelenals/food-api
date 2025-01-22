import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input('btn-text') BtnText: string = ''; // Entrada para o texto do botão
  @Output() buttonClick = new EventEmitter<void>(); // Evento para emitir o clique

  OnButtonClick(): void {
    this.buttonClick.emit(); // Emite o evento quando o botão é clicado
  }
}