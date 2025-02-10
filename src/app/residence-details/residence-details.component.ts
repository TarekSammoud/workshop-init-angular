import { Component, OnInit } from '@angular/core';
import { Residence } from '../core/models/residence';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResidenceService } from '../residence.service';
@Component({
  selector: 'app-residence-details',
  templateUrl: './residence-details.component.html',
  styleUrls: ['./residence-details.component.css']
})
export class ResidenceDetailsComponent implements OnInit {
  

  constructor(private residenceService : ResidenceService ,private route: ActivatedRoute,private router: Router) { 
  }
  public resID!: number;
  residences: Residence[]=[];
   public SelectedRes! : Residence; 
   private routeSub!: Subscription;


   ngOnInit(): void {
    this.residenceService.getResidences().subscribe(residences => this.residences = residences);

    this.routeSub = this.route.paramMap.subscribe(params => {
      let id = +params.get('id')!;
      this.resID = id - 1;
      this.SelectedRes = this.residences[this.resID];
    });
  }

  nextRes(){
    const nextResID = this.resID + 1;
      if (nextResID < this.residences.length) {
      this.router.navigate(['/residences', this.residences[nextResID].id]);
    } else {
      this.router.navigate(['/residences', 1]);
    } 
  }

  addRes(){
    this.router.navigate(['/addResidence']);
  }

  
  updateRes(id: number){
    this.router.navigate(['/updateResidence',this.SelectedRes.id]);
  }


}
