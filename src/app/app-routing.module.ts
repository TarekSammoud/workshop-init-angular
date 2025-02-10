import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ResidencesComponent } from './Residences/residences/residences.component';
import { AddResidenceComponent } from './Residences/add-residence/add-residence.component';
import { ApartmentsComponent } from './Apartments/apartments/apartments.component';
import { ApartmentsByResidenceComponent } from './Apartments/apartments-by-residence/apartments-by-residence.component';
import { AddApartmentComponent } from './Apartments/add-apartment/add-apartment.component';
import { ResidenceDetailsComponent } from './residence-details/residence-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'residences',  
    component: ResidencesComponent,
    
  },
  {
    path: 'apartments',  
    component: ApartmentsComponent,
    
  },
  {path: 'apartments/:id', component: ApartmentsByResidenceComponent},
  {path: 'residences/:id', component: ResidenceDetailsComponent},
  {path: 'addResidence', component: AddResidenceComponent},
  {path: 'add-apartment', component: AddApartmentComponent},
  {path: 'updateResidence/:id', component: AddResidenceComponent},
  {path: '**', component: NotFoundComponent},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
