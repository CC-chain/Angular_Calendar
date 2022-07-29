import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IData, LoginContextInterface, RegisterContextInterface, UserAuthentication } from '@app/data/schema/data';
import { DataCsService } from '@app/data/service/data-cs.service';



const defaultUser = {
  username: 'Arif',
  password: '12345',
  token: '12345'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user!: UserAuthentication;
  constructor(private dataCsService: DataCsService) { }

  login(loginContext: LoginContextInterface) {
    return this.dataCsService.getLogin(loginContext).pipe(
      map((data: any) => {
        let curData: IData = <IData>data;
        if (!curData.success) {
          return false;
        }
        return true
      }),
    )
  }

  register(registerContext: RegisterContextInterface) {
    return this.dataCsService.getRegister(registerContext).pipe(
      map((data: any) => {
        let curData: IData = <IData>data;
        console.log(curData)
        if (!curData.success) {
          return false;
        }
        this.setSession(curData.data)
        return true
      })
    )
  }
  private setSession(authResult: UserAuthentication) {
    localStorage.setItem("id_token", authResult.token);
    localStorage.setItem("expires_at", authResult.expiration);
    localStorage.setItem("id_user", authResult.userId)
    console.log(localStorage)
  }

  public isLoggedIn() {
    return new Date() < new Date(this.getExpiration()!);
  }

  public isSiteActive() {
    return localStorage.getItem("id_site") != null ? true : false
  }
  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    return expiration;
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("id_user");
  }
}
