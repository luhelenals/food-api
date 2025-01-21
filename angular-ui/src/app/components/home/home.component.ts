import { Component } from '@angular/core';
import { ReceitasComponent } from "../receitas/receitas.component";
import { IngredientesComponent } from "../ingredientes/ingredientes.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReceitasComponent, IngredientesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
