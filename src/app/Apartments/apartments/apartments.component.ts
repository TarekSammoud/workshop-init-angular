import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Apartment } from 'src/app/core/models/apartment';
import { ApartmentsService } from 'src/app/core/Services/apartments.service';

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.css']
})
export class ApartmentsComponent implements OnInit {

  constructor(private apartmentsService: ApartmentsService, private router: Router) {}

  @ViewChild('f') myForm: NgForm | undefined; 
  apart!: Apartment;
  apartments: Apartment[] = [];

  ngOnInit(): void {
    // Subscribe to the observable to get apartments data
    this.apartmentsService.getApartments().subscribe(
      (data) => {
        this.apartments = data; // Assign the received data to apartments array
        console.log('Apartments loaded:', this.apartments);
      },
      (error) => {
        console.error('Error loading apartments:', error);
      }
    );
  }

  addApartment(): void {
    this.router.navigate(['/add-apartment']);
  }

  onFormSubmit(): void {
    if (this.myForm?.valid) {
      this.apart = new Apartment(); 

      // Map form values to apartment object
      this.apart.surface = this.myForm?.value['surface'];
      this.apart.terrace = this.myForm?.value['terrace'];
      this.apart.surfaceterrace = this.myForm?.value['surfaceterrace'];
      this.apart.category = this.myForm?.value['category'];
      this.apart.ResidenceId = this.myForm?.value['ResidenceId'] - 1; // Assuming you need to subtract 1
      this.apart.apartNum = this.myForm?.value['apartNum'];
      this.apart.floorNum = this.myForm?.value['floorNum'];

      console.log('New Apartment:', this.apart);

      // Add the apartment
      this.apartmentsService.addApartment(this.apart);

      // Optionally, navigate to another page or clear the form
      this.router.navigate(['/apartments']);
      this.myForm?.reset(); // Reset form after submission
    } else {
      console.error('Form is invalid.');
    }
  }
}
