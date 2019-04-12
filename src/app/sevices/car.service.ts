import { Injectable } from '@angular/core';
import { Announcement } from '../annoucment';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable, of } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})


export class CarService {

  private annoucmentUrl = 'http://localhost:3000/admin/annoucement';

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result? :T){
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T)
    }
  }

  getAnnouncment(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(this.annoucmentUrl)
    .pipe(
      tap(_ => console.log('fetched Announcement')),
      catchError(this.handleError<Announcement[]>('getAnnouncment', []))
    )
  }

}
