import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomCs, DataCs } from '@data/schema/data';
import { CalendarEvent } from 'angular-calendar';
import { catchError, map, Observable, retry, throwError } from 'rxjs';

interface IDataCs {
  data : any ,
    message: string ,
    success : boolean
}

@Injectable({
  providedIn: 'root'
})
export class DataCsService {
  private dataCsUrl = 'http://localhost:5000/api/';
  constructor(private http: HttpClient) { }

  getStyles(dbUrl: string): Observable<DataCs[]> {
    dbUrl =  dbUrl.replace(/\//g,"/Get")
    return this.http.get<DataCs[]>(this.dataCsUrl + dbUrl).pipe(
      map((data : any ) => {
        let curData : IDataCs  = <IDataCs> data;
        if(!curData.success){
        return throwError(() => curData.message);
        }
        return curData.data
      }),
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  createStyles(dataCs: DataCs[], dbUrl: string): Observable<any> {
    return this.http.put(this.dataCsUrl + dbUrl, dataCs);
  }

  editStyles(dataCs: DataCs[], dbUrl: string): Observable<any> {
    dbUrl =  dbUrl.replace(/\//g,"/Set")
    console.log(this.dataCsUrl + dbUrl, JSON.stringify(dataCs))
    return this.http.put(this.dataCsUrl + dbUrl, dataCs)
  }

  deleteStyles(id: number, dbUrl: string): Observable<any> {
    return this.http.delete(this.dataCsUrl + dbUrl + id);
  }

  getCustoms(dbUrl: string): Observable<CustomCs[]> {
    return this.http.get<CustomCs[]>(this.dataCsUrl + dbUrl).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  createCustoms(dataCs: CustomCs, dbUrl: string): Observable<CustomCs> {
    dataCs.id = null;
    return this.http.post<CustomCs>(this.dataCsUrl + dbUrl, dataCs).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  editCustoms(dataCs: CustomCs, dbUrl: string): Observable<any> {
    console.log('geld', dataCs)
    return this.http.put(this.dataCsUrl + dbUrl + dataCs.id, dataCs);
  }

  deleteCustoms(id: number, dbUrl: string): Observable<any> {
    return this.http.delete(this.dataCsUrl + dbUrl + id);
  }

  getCalendar(dbUrl: string): Observable<CalendarEvent[]> {
    console.log('geldi',dbUrl)
    return this.http.get<CalendarEvent[]>(this.dataCsUrl + dbUrl).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  createCalendar(dataCs: CalendarEvent, dbUrl: string): Observable<CalendarEvent> {
    return this.http.post<CalendarEvent>(this.dataCsUrl + dbUrl, dataCs).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  editCalendar(dataCs: CalendarEvent, dbUrl: string): Observable<any> {
    console.log('edit', dataCs)
    return this.http.put(this.dataCsUrl + dbUrl + dataCs.id, dataCs);
  }

  deleteCalendar(id: number, dbUrl: string): Observable<any> {
    console.log('geld',this.dataCsUrl+dbUrl+id)
    return this.http.delete(this.dataCsUrl + dbUrl + id).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error)
        return throwError(()  => error)
      },
      )
    );
  }




}
