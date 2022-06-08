import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem("id_token");
    const siteId = localStorage.getItem("id_site");
    if(idToken && siteId){
      const cloned = request.clone({
        headers: request.headers.set("Authorization",
        "Bearer " + idToken)
        .set("SiteId", siteId )
      });
      return next.handle(cloned);
    }
    else if(siteId) {
      const cloned = request.clone({
        headers: request.headers
        .set("SiteId", siteId )
      });
      return next.handle(cloned);
    }
    return next.handle(request);
  }
}
