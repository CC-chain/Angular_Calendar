import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CalendarConfig, CustomCs, CustomMetaInterface, DataCs, IData, LoginContextInterface, Site, UserAuthentication } from '@data/schema/data';
import { CalendarEvent } from 'angular-calendar';
import { catchError, map, Observable, of, retry, throwError, shareReplay } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DataCsService {
  private dataCsUrl = 'http://localhost:5001/api/';
  constructor(private http: HttpClient) {
  }

  getStyles(dbUrl: string): Observable<DataCs[]> {
    return this.http.get<DataCs[]>(this.dataCsUrl + dbUrl).pipe(
      map((data: any) => {
        let curData: IData = <IData>data;
        if (!curData.success) {
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
    return this.http.put(this.dataCsUrl + dbUrl, dataCs)
  }

  deleteStyles(id: number, dbUrl: string): Observable<any> {
    return this.http.delete(this.dataCsUrl + dbUrl + id);
  }

  getCustoms(dbUrl: string): Observable<CustomCs[]> {
    return this.http.get<CustomCs[]>(this.dataCsUrl + dbUrl).pipe(
      map((data: any) => {
        let curData: IData = <IData>data;
        if (!curData.success) {
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

  createCustoms(dataCs: CustomCs[], dbUrl: string): Observable<CustomCs[]> {
    return this.http.put<CustomCs[]>(this.dataCsUrl + dbUrl, dataCs)
  }

  editCustoms(dataCs: CustomCs[], dbUrl: string): Observable<any> {
    console.log(this.dataCsUrl + dbUrl, JSON.stringify(dataCs))
    return this.http.put(this.dataCsUrl + dbUrl, dataCs)
  }

  deleteCustoms(id: number, dbUrl: string): Observable<any> {
    return this.http.delete(this.dataCsUrl + dbUrl + id);
  }

  getCalendar(dbUrl: string): Observable<any[]> {
    return this.http.get<CalendarEvent<CustomMetaInterface>[]>(this.dataCsUrl + dbUrl).pipe(
      map((data: any) => {
        let curData: IData = <IData>data;
        if (!curData.success) {
          return throwError(() => curData.message);
        }
        console.log(curData.data)
        return curData.data
      }),
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => error);
      })
    );

  }

  createCalendar(dataCs: any, dbUrl: string): Observable<any> {
    console.log(this.dataCsUrl + dbUrl, JSON.stringify(dataCs))
    return this.http.post<any>(this.dataCsUrl + dbUrl, dataCs)
  }

  editCalendar(dataCs: any, dbUrl: string): Observable<any> {
    console.log(this.dataCsUrl + dbUrl, JSON.stringify(dataCs))
    return this.http.post<CalendarEvent[]>(this.dataCsUrl + dbUrl, dataCs)
  }

  deleteCalendar(id: number, dbUrl: string): Observable<any> {
    return this.http.delete(this.dataCsUrl + dbUrl + "?id="+ id).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error)
        return throwError(() => error)
      },
      )
    );
  }

  getCalendarConfig(dbUrl: string): Observable<CalendarConfig> {
    return this.http.get<CalendarConfig>(this.dataCsUrl + dbUrl).pipe(
      map((data: any) => {
        let curData: IData = <IData>data;
        if (!curData.success) {
          return throwError(() => curData.message);
        }
        return curData.data[0]
      }),
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  createCalendarConfig(dataCs: CalendarConfig, dbUrl: string): Observable<CalendarConfig> {
    let dataCsArr = [dataCs]
    return this.http.put<CalendarConfig>(this.dataCsUrl + dbUrl, dataCsArr)
  }

  editCalendarConfig(dataCs: CalendarConfig, dbUrl: string): Observable<any> {
    console.log(this.dataCsUrl + dbUrl, JSON.stringify(dataCs))
    let dataCsArr = [dataCs]
    return this.http.put<CalendarConfig>(this.dataCsUrl + dbUrl, dataCsArr)
  }

  deleteCalendarConfig(id: number, dbUrl: string): Observable<any> {
    return this.http.delete(this.dataCsUrl + dbUrl + id).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error)
        return throwError(() => error)
      },
      )
    );
  }

  getLogin(user : any) : Observable<UserAuthentication> {
    let header = new HttpHeaders("SiteId : 1")
    console.log(JSON.stringify(user), 123123123123 , this.dataCsUrl + "Account/Login")
    return this.http.post<UserAuthentication>(this.dataCsUrl + "Account/Login", user )
  }

  getSite() : Observable<Site[]>{
    console.log("asdasdad")
    return this.http.get<Site[]>(this.dataCsUrl + "Site/List",).pipe(
      map((res: any) => {
        let curData : IData = <IData> res
        if (!curData.success) {
          return throwError(() => curData.message);
        }
        console.log(curData.data)
        return curData.data
      }),
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => error);
      })
    )
  }

}
