import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Residence } from 'src/app/core/models/residence';
import { ResidenceService } from 'src/app/residence.service';
@Component({
  selector: 'app-residences',
  templateUrl: './residences.component.html',
  styleUrls: ['./residences.component.css']
})


export class ResidencesComponent implements OnInit {

  listResidencesFavorite: Residence[]=[];
  listResidencesFiltered: Residence[]=[];
  listResidences: Residence[] = [];

  constructor(private router: Router, private residenceService : ResidenceService) { 
  } 

  ngOnInit(): void {
    this.residenceService.getResidences().subscribe(residences => this.listResidences = residences);
    this.listResidencesFiltered = this.listResidences;
  }



   ShowLocation(id: number){
      this.listResidences[id-1].locationShown = !this.listResidences[id-1].locationShown;
      console.log(this.listResidences[id-1].locationShown);
      if (this.listResidences[id-1].address=="inconnu"){
        alert("Adresse inconnue");
      } 
   }

   LikeRes(id: number){
    console.log(this.listResidencesFavorite);
    this.listResidencesFavorite.push(this.listResidences[id-1]);
   }

   filterResults(text: string) {
    if (!text) {
      this.listResidencesFiltered = this.listResidences;
      return;
    }
  
    this.listResidencesFiltered = this.listResidences.filter(
      Residence => Residence?.address.toLowerCase().includes(text.toLowerCase())
    );
  }

  OnSelect(res : Residence){
    this.router.navigate(['/residences', res.id]);
  }

  ListApartments(res : Residence){
    this.router.navigate(['/apartments', res.id]);
  }


}
