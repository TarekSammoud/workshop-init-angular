import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Apartment } from 'src/app/core/models/apartment';
import { ApartmentsService } from 'src/app/services/apartments.service';

@Component({
  selector: 'app-add-apartment',
  templateUrl: './add-apartment.component.html',
  styleUrls: ['./add-apartment.component.css']
})
export class AddApartmentComponent {

  constructor (private apartmentsService : ApartmentsService) {}


      @ViewChild('f') myForm: NgForm | undefined; 
      apart! : Apartment ; 
  
      onFormSubmit(){
        this.apart = new Apartment(); 
        
  
        console.log(this.myForm);
          this.apart.surface = this.myForm?.value['surface'];
          this.apart.terrace = this.myForm?.value['terrace'];
          this.apart.surfaceterrace = this.myForm?.value['surfaceterrace'];
          this.apart.category = this.myForm?.value['category'];
          this.apart.ResidenceId = this.myForm?.value['ResidenceId'] -1;
          this.apart.apartNum = this.myForm?.value['apartNum'];
          this.apart.floorNum = this.myForm?.value['floorNum'];
          console.log(this.apart);
          this.apartmentsService.addApartment(this.apart);
      }
}
