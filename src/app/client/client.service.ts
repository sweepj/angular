import { Injectable } from '@angular/core';;
import { AnnouncementPost } from './annocement_post';
import { Observable, from, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError,tap } from 'rxjs/operators';
import { CarService } from '../sevices/car.service';
import {Brand} from './brand';
import { Model } from './model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/x-www-form-urlencoded'})
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private addAnnouUrl = 'http://localhost:3000/admin/annoucement';
  private getBrandUrl = 'http://localhost:3000/admin/brand';
  private getModelsByBrandUrl = 'http://localhost:3000/admin/models'
  constructor(private http: HttpClient, private carService: CarService) { }


  private handleError<T> (operation = 'operation', result? :T){
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T)
    }
  }

  addAnnoucement(annoucement: AnnouncementPost): Observable<AnnouncementPost> {
    return this.http.post<AnnouncementPost>(this.addAnnouUrl, annoucement)
    .pipe(
      catchError(this.handleError<AnnouncementPost>('addAnnoucement'))
    )
  }
  getBrand(): Observable<Brand[]>{
    return this.http.get<Brand[]>(this.getBrandUrl)
      .pipe(
        catchError(this.handleError<Brand[]>('getBrand', []))
      )
  }
  getModelsByBrand(id: number): Observable<Model[]> {
    return this.http.get<Model[]>(`${this.getModelsByBrandUrl}/${id}`)
    .pipe(
      catchError(this.handleError<Model[]>('getModelsByBrand', []))
    )
  }

  searchByBrandId(id: string): Observable<Model[]> {
    return this.http.get<Model[]>(`${this.getModelsByBrandUrl}/${id}`)
    .pipe(
      tap(_ => console.log(id)),
      catchError(this.handleError<Model[]>('searchByBrandId', []))
    )
  }
}
