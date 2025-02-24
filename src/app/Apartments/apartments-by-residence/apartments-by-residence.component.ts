import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apartment } from 'src/app/core/models/apartment';
import { ApartmentsService } from 'src/app/core/Services/apartments.service';

@Component({
  selector: 'app-apartments-by-residence',
  templateUrl: './apartments-by-residence.component.html',
  styleUrls: ['./apartments-by-residence.component.css']
})
export class ApartmentsByResidenceComponent implements OnInit {
  
  apartments!: Apartment[];

  constructor(private apartmentsService: ApartmentsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Subscribe to route parameters
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!; // Get the ID from the route parameter
      console.log(id);

      // Fetch apartments by ResidenceId, assuming the service method returns an observable
      this.apartmentsService.getApartmentsByID(id).subscribe(
        (apartments: Apartment[]) => {
          this.apartments = apartments; // Assign the fetched apartments to the local array
          console.log('Apartments for residence:', this.apartments);
        },
        (error) => {
          console.error('Error fetching apartments:', error);
        }
      );
    });
  }
}
