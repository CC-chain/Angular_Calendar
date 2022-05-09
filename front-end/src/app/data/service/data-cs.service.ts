import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataCs } from '@data/schema/data';
import { catchError, Observable, retry, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataCsService {
  private dataCsUrl = 'http://localhost:4200/api/styles/';
  constructor(private http : HttpClient) { }

  getStyles(): Observable<DataCs[]> {
    return this.http.get<DataCs[]>(this.dataCsUrl).pipe(
      retry(2),
      catchError((error : HttpErrorResponse) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  createStyles(dataCs : DataCs): Observable<DataCs> {
    dataCs.id = null;
    return this.http.post<DataCs>(this.dataCsUrl, dataCs).pipe(
      catchError((error : HttpErrorResponse) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

editStyles(dataCs : DataCs): Observable<any>{
  return this.http.put(this.dataCsUrl + dataCs.id, dataCs);
}

deleteStyles(id : number): Observable<any>{
  return this.http.delete(this.dataCsUrl + id);
}



}
