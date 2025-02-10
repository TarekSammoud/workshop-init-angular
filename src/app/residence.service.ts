import { Injectable } from '@angular/core';
import { Residence } from './core/models/residence';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResidenceService {

    listResidences: Residence[]=[
      {id:1,"locationShown": false,"name": "El fel","address":"Borj Cedria", "image":"../../assets/R1.jpeg", status: "Disponible"},
       {id:2,"locationShown": false,"name": "El yasmine", "address":"Ezzahra","image":"../../assets/R2.jpeg", status: "Disponible" },
       {id:3,"locationShown": false,"name": "El Arij", "address":"Rades","image":"../../assets/R3.jpeg", status: "Vendu"},
       {id:4,"locationShown": false,"name": "El Anber","address":"inconnu", "image":"../../assets/R4.jpeg", status: "En Construction"}
     ];

     getResidences(): Observable<Residence[]> {
      return of(this.listResidences);
    }

    addResidence(residence: Residence): void {
      this.listResidences.push(residence);
    }

    updateResidence(residence: Residence): void {
      const index = this.listResidences.findIndex(r => r.id === residence.id);
      if (index !== -1) {
        this.listResidences[index] = residence;
      }
    }

  constructor() { }
}
