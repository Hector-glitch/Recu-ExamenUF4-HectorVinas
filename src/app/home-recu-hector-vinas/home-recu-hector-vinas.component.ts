import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-home-recu-hector-vinas',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './home-recu-hector-vinas.component.html',
  styleUrls: ['./home-recu-hector-vinas.component.css']
})
export class HomeRecuHectorVinasComponent {
  berryId: number;
  berry: any = null;
  esDols: boolean = false;

  constructor(private http: HttpClient) {
    this.berryId = this.IDBerryAleatoria();
  }

  IDBerryAleatoria(): number {
    return Math.floor(Math.random() * 64) + 1; // ID aleatoria entre 1 y 64
  }

  searchBerry() {
    this.fetchBerryData(this.berryId)
      .then((berryData: any) => {
        this.berry = {
          name: berryData.name,
          imageUrl: berryData.imageUrl
        };

        const sweetFlavor = berryData.flavors.find((flavor: any) => flavor.flavor.name === 'sweet' && flavor.potency > 0);
        this.esDols = sweetFlavor && sweetFlavor.potency > 0;

        //Missatge per consola si la baia es dolça o no
        if (this.esDols) {
          console.log(`Promesa resolta! La baia ${berryData.name} és dolça. Potència de sabor: ${sweetFlavor.potency}`);
        } else {
          const otherFlavor = berryData.flavors.find((flavor: any) => flavor.potency > 0);
          if (otherFlavor) {
            console.log(`Promesa rebutjada! La baia ${berryData.name} és ${otherFlavor.flavor.name}. Potència de sabor: ${otherFlavor.potency}`);
          } else {
            console.log(`La baia ${berryData.name} no te cap sabor amb una potencia mes gran que 0.`);
          }
        }
      })
      .catch(() => {
        this.berry = null;
        this.esDols = false;
        console.log('Error al obtener datos de la API de PokeAPI');
      });
  }

  fetchBerryData(berryId: number) {
    return new Promise((resolve, reject) => {
      fetch(`https://pokeapi.co/api/v2/berry/${berryId}/`)
        .then(response => response.json())
        .then(berryData => {
          // Hacer una segunda llamada para obtener los datos del item asociado a la baya
          fetch(berryData.item.url)
            .then(response => response.json())
            .then(itemData => {
              resolve({
                name: berryData.name,
                flavors: berryData.flavors,
                imageUrl: itemData.sprites?.default // Ajusta según la estructura de la respuesta
              });
            })
            .catch(() => {
              reject();
            });
        })
        .catch(() => {
          reject();
        });
    });
  }

  searchRandomBerry() {
    this.berryId = this.IDBerryAleatoria();
    this.searchBerry();
  }
}
