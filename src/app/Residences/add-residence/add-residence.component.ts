import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Residence } from 'src/app/core/models/residence';
import { ResidenceService } from 'src/app/core/Services/residence.service';

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
  title!:string;

  constructor(private _resService:ResidenceService,private route: ActivatedRoute, private router: Router){}

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
    this.title="Add Residence";
  
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.updating = true;
      this._resService.getResidences().subscribe(residences => {
        const foundResidence = residences.find(res => res.id === id); // Ensure id is converted to number if necessary
        if (foundResidence) {
          this.res = foundResidence;
          console.log("Residence found", this.res);
          this.title = `Update Residence ${this.res.name}`;
  
          // Pre-fill the form with existing residence data
          this.residence_data.setValue({
            name: this.res.name,
            address: this.res.address,
            status: this.res.status,
            image: this.res.image,  // Assuming `image` field is in `this.res`
          });
  
        } else {
          console.log("Residence not found");
        }
      });
    } else {
      // If not updating, set default values
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
        this._resService.getLength().subscribe(length => {
          this.residence_data.addControl('id', new FormControl(length + 1));
          this._resService.addResidence(this.residence_data.value).subscribe(
            response => {
              console.log('Residence added successfully:', response);
              this.router.navigate(['/residences']);
            },
            error => {
              console.error('Error adding residence:', error);
            }
          );
        });
      } else {
        // Updating an existing residence
        console.log("Updating residence:", this.residence_data.value);
        this.residence_data.value.id = this.res.id; // Make sure the correct ID is passed
        
        this._resService.updateResidence(this.residence_data.value).subscribe(
          response => {
            console.log('Residence updated successfully:', response);
            this.router.navigate(['/residences']);
          },
          error => {
            console.error('Error updating residence:', error);
          }
        );
      }
    } else {
      console.error("Form is invalid:", this.residence_data.errors);
      console.error("Form data:", this.residence_data.value);
    }
  }
  

}
