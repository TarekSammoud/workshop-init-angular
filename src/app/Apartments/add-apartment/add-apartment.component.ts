import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Apartment } from 'src/app/core/models/apartment';
import { ApartmentsService } from 'src/app/services/apartments.service';
import { ResidenceService } from 'src/app/residence.service';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-add-apartment',
  templateUrl: './add-apartment.component.html',
  styleUrls: ['./add-apartment.component.css']
})
export class AddApartmentComponent implements OnInit {

  constructor (private apartmentsService : ApartmentsService, private residenceService : ResidenceService) {}
  resListe = this.residenceService.getResidences();

  appartement_data! : FormGroup;




  apart: Apartment = new Apartment(); 
  listeResidence: any = this.residenceService.getResidences();


  ngOnInit(): void {
    this.appartement_data = new FormGroup({
      'surface': new FormControl(null, [Validators.required]),
      'terrace': new FormControl(false, [Validators.required]),
      'surfaceterrace': new FormControl({ value: 0, disabled: true }, [Validators.required]),
      'category': new FormControl('S+1', [Validators.required]),
      'ResidenceId': new FormControl(null, [Validators.required]),
      'apartNum': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+$')]),
      'floorNum': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+$')])
    });

        this.appartement_data.get('terrace')?.valueChanges.subscribe(value => {
          if (value) {
            this.appartement_data.get('surfaceterrace')?.enable();
          } else {
            this.appartement_data.get('surfaceterrace')?.disable();
            this.appartement_data.get('surfaceterrace')?.reset();
          }
        });
      }
  
      onFormSubmit() {
        if (this.appartement_data.valid) {
          console.log("Submitting form:", this.appartement_data.value);
    
          this.apartmentsService.addApartment(this.appartement_data.value)
        } else {
          console.error("Form is invalid:", this.appartement_data.errors);
          console.error("Form data:", this.appartement_data.value);

        }
      }

      onReset(){
        this.appartement_data.reset();
      }
}
