import { Component } from '@angular/core';
import { ReceitasComponent } from "../receitas/receitas.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReceitasComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
