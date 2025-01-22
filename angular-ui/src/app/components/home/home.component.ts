import { Component } from '@angular/core';
import { ReceitasComponent } from "../receitas/receitas.component";
import { IngredientesComponent } from "../ingredientes/ingredientes.component";
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReceitasComponent, IngredientesComponent, ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {  
  OnButtonClick(type: string) {
    console.log("Clicou no botão " + type);
  }
}
