import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomCs, DataCs } from '@data/schema/data';
import { catchError, Observable, retry, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataCsService {
  private dataCsUrl = 'http://localhost:4200/api/';
  constructor(private http : HttpClient) { }

  getStyles(dbUrl : string): Observable<DataCs[]> {
    return this.http.get<DataCs[]>(this.dataCsUrl + dbUrl).pipe(
      retry(2),
      catchError((error : HttpErrorResponse) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  createStyles(dataCs : DataCs , dbUrl : string ): Observable<DataCs> {
    dataCs.id = null;
    return this.http.post<DataCs>(this.dataCsUrl + dbUrl, dataCs).pipe(
      catchError((error : HttpErrorResponse) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

editStyles(dataCs : DataCs , dbUrl : string): Observable<any>{
  console.log('geld',dataCs)
  return this.http.put(this.dataCsUrl + dbUrl + dataCs.id, dataCs);
}

deleteStyles(id : number , dbUrl : string): Observable<any>{
  return this.http.delete(this.dataCsUrl + dbUrl + id);
}

getCustoms(dbUrl : string): Observable<CustomCs[]> {
    return this.http.get<CustomCs[]>(this.dataCsUrl + dbUrl).pipe(
      retry(2),
      catchError((error : HttpErrorResponse) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  createCustoms(dataCs : CustomCs, dbUrl : string ): Observable<CustomCs> {
    dataCs.id = null;
    return this.http.post<CustomCs>(this.dataCsUrl + dbUrl, dataCs).pipe(
      catchError((error : HttpErrorResponse) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

editCustoms(dataCs : CustomCs , dbUrl : string): Observable<any>{
  console.log('geld',dataCs)
  return this.http.put(this.dataCsUrl + dbUrl + dataCs.id, dataCs);
}

deleteCustoms(id : number , dbUrl : string): Observable<any>{
  return this.http.delete(this.dataCsUrl + dbUrl + id);
}



}
