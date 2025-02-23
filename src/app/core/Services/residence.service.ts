import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ResidenceService {
  private residenceUrl = 'http://localhost:3000/residences'; 

  constructor(private http: HttpClient) {}
  getResidences(): Observable<any[]> {
    return this.http.get<any[]>(this.residenceUrl);
  }

  deleteResidence(id: number): Observable<any> {
    return this.http.delete(`${this.residenceUrl}/${id}`);
  }

  addResidence(residence: any): Observable<any> {
    return this.http.post(this.residenceUrl, residence);
  }

  getLength(): Observable<number> {
    return new Observable(observer => {
      this.http.get<any[]>(this.residenceUrl).subscribe(
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
  

  updateResidence(residence: any): Observable<any> {
    return this.http.put(`${this.residenceUrl}/${residence.id}`, residence);
  }
  


}
