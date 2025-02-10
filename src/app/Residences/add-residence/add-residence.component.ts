import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Residence } from 'src/app/core/models/residence';
import { ResidenceService } from 'src/app/residence.service';

@Component({
  selector: 'app-add-residence',
  templateUrl: './add-residence.component.html',
  styleUrls: ['./add-residence.component.css']
})
export class AddResidenceComponent implements OnInit {
  res!: Residence;
  updating = false;


  selectedOption!: string;

  constructor(private route: ActivatedRoute,private residenceService: ResidenceService, private router: Router){}


  
  ngOnInit(): void {
    this.res = new Residence();
    this.selectedOption = "Vendu";
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.updating = true;
      this.residenceService.getResidences().subscribe(residences => {
        const foundResidence = residences.find(res => res.id === +id); // Convert id to number if necessary
        if (foundResidence) {
          this.res = foundResidence;
          console.log("Residence found");
        } else {
          console.log("Residence not found");
        }
      });
    }
    
}

  @ViewChild('f') myForm: NgForm | undefined; 

  onFormSubmit(){

    

      console.log(this.myForm?.value);
      this.res.name = this.myForm?.value['name'];
      this.res.address = this.myForm?.value['address'];
      this.res.status = this.selectedOption;
      this.res.image = "../../assets/R1.jpeg";
      this.res.status = "Disponible";
      if (!this.updating)
      this.residenceService.getResidences().subscribe(residences => {
        this.res.id = residences.length + 1;
      });
      if (!this.updating)
      this.residenceService.addResidence(this.res);
    else
      this.residenceService.updateResidence(this.res);
     // this.router.navigate(['/residences']);
     console.log(this.residenceService.getResidences());
  }

}
