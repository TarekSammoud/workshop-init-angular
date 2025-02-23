import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apartment } from '../core/models/apartment';

@Injectable({
  providedIn: 'root',
})
export class ApartmentsService {
  private apiUrl = 'http://localhost:3000/apartments'; // URL for your JSON Server endpoint

  constructor(private http: HttpClient) {}

  // Get all apartments
  getApartments(): Observable<Apartment[]> {
    return this.http.get<Apartment[]>(this.apiUrl);
  }

  getLength(): Observable<number> {
    return new Observable(observer => {
      this.http.get<any[]>(this.apiUrl).subscribe(
        (data) => {
          // Emit the length of the array
          observer.next(data.length);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  // Add a new apartment
  addApartment(apart: Apartment): Observable<Apartment> {
    return this.http.post<Apartment>(this.apiUrl, apart);
  }

  // Get apartments by Residence ID
  getApartmentsByID(id: number): Observable<Apartment[]> {
    return this.http.get<Apartment[]>(`${this.apiUrl}?ResidenceId=${id}`);
  }
}
