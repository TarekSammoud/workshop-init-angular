import { CommonModule, NgClass, NgIf, NgSwitch } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Residence } from 'src/app/core/models/residence';
import { CommonService } from 'src/app/core/Services/common.service';
//import { ResidenceService } from 'src/app/residence.service';
import { ResidenceService } from 'src/app/core/Services/residence.service';
@Component({
  selector: 'app-residences',
  templateUrl: './residences.component.html',
  styleUrls: ['./residences.component.css'],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[],
  standalone: true,
})


export class ResidencesComponent implements OnInit {

  listResidencesFavorite: Residence[]=[];
  listResidencesFiltered: Residence[]=[];
  listResidences: Residence[] = [];

  constructor(private _resService: ResidenceService,private _commonService: CommonService,private router: Router, private residenceService : ResidenceService) { 
  } 

  ngOnInit(): void {
    this.residenceService.getResidences().subscribe(residences => {
      this.listResidences = residences;
      this.listResidencesFiltered = residences;  
      console.log(this.listResidences);
      console.log(this._commonService.getSameValueOf(this.listResidences, "address", "Borj Cedria"));
    });
  }
  

  addRes(){
    this.router.navigate(['/add-residence']);
  }

  deleteResidence(id: number) {
    if (confirm("Are you sure you want to delete this residence?")) { 
      this._resService.deleteResidence(id).subscribe({
        next: () => {
          this.listResidences = this.listResidences.filter(res => res.id !== id); 
          this.listResidencesFiltered = this.listResidencesFiltered.filter(res => res.id !== id); 

        },
        error: err => {
          console.error("Error deleting residence:", err);  
        }
      });
    }
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
