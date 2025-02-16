import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
  residence_data!: FormGroup;
  imageUrl!: string;

  constructor(private route: ActivatedRoute,private residenceService: ResidenceService, private router: Router){}

  isModalOpen = false;

  openModal(): void {
    this.isModalOpen = true;
  }
  closeModal(): void {
    this.isModalOpen = false;
  }
  
  ngOnInit(): void {
    this.residence_data = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'address': new FormControl(null, [Validators.required]),
      'status': new FormControl(null, [Validators.required]),
      'image': new FormControl(null),

    });
    
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
    } else {
      this.residence_data = new FormGroup({
        'name': new FormControl(null, [Validators.required]),
        'address': new FormControl(null, [Validators.required]),
        'status': new FormControl('Vendu', [Validators.required]),
      });
    }
  }

  onImageChange(event: any): void {
    const file = event.target.files[0];
    console.log("File:", file);
    if (file) {
      this.imageUrl = file.name; 
    }
  }
  
  

  onFormSubmit() {
    console.log("Form data before adding:", this.residence_data?.value);

    if (this.residence_data.valid) {
      console.log("Submitting form:", this.residence_data.value);
      this.residence_data.value.image = "../../assets/" + this.imageUrl;
  
      if (!this.updating) {
     
        this.residenceService.addResidence(this.residence_data.value);
        this.router.navigate(['/residences']);

      } else {
        // Update the residence
        this.residenceService.updateResidence(this.residence_data.value);
      }
    } else {
      console.error("Form is invalid:", this.residence_data.errors);
      console.error("Form data:", this.residence_data.value);
    }
  }
  

}
