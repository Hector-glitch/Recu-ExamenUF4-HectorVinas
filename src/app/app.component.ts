import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HomeRecuHectorVinasComponent} from "./home-recu-hector-vinas/home-recu-hector-vinas.component";
import {InfoRecuHectorVinasComponent} from "./info-recu-hector-vinas/info-recu-hector-vinas.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeRecuHectorVinasComponent, InfoRecuHectorVinasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ExamenRecuUF4HectorVinas';
}
