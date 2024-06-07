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
    return Math.floor(Math.random() * 64) + 1; //Generar ID aleatòria entre 64 i 1
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
          //Buscar quins altres abors hi ha si el sweet no es troba
          const otherFlavor = berryData.flavors.find((flavor: any) => flavor.potency > 0);
          if (otherFlavor) {
            console.log(`Promesa rebutjada! La baia ${berryData.name} és ${otherFlavor.flavor.name}. Potència de sabor: ${otherFlavor.potency}`);
          } else {
            //Missatge per si cap sabor es troba
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
          //Un segon fetch per obtenir les dades de la baia en concret
          fetch(berryData.item.url)
            .then(response => response.json())
            .then(itemData => {
              resolve({
                name: berryData.name,
                flavors: berryData.flavors,
                imageUrl: itemData.sprites?.default
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
