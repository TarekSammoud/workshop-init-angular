import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Apartment } from 'src/app/core/models/apartment';
import { Residence } from 'src/app/core/models/residence';
import { ApartmentsService } from 'src/app/services/apartments.service';

@Component({
  selector: 'app-apartments-by-residence',
  templateUrl: './apartments-by-residence.component.html',
  styleUrls: ['./apartments-by-residence.component.css']
})
export class ApartmentsByResidenceComponent implements OnInit{
  
  constructor(private apartmentService: ApartmentsService, private route: ActivatedRoute) { }




  apartments! : Apartment[];
  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      let id = +params.get('id')!;
      console.log(id);
      this.apartments = this.apartmentService.getApartmentsByID(id -1 );

    });

    console.log(this.apartments);
    console.log(this.apartmentService.getApartments());

  }

}
