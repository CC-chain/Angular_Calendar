import { ComponentRef, Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DynamicImportService {
  constructor(){
    this.currContentSubject.subscribe(value => {
      this.currContentComponent = value;
    })
  };
  private currContentSubject : Subject<ViewContainerRef> = new Subject<ViewContainerRef>();
  private currContentComponent!: ViewContainerRef;
  public async loadComponent(layout : string , component?: ViewContainerRef){
    console.log("geldi",layout, component)
    if(typeof component === "undefined") {
      if(typeof this.currContentComponent !== "undefined")
          component = this.currContentComponent
      else {
        console.log("error", component)
        return;
      }
    }
    console.log("geldi",layout, component)

    switch(layout){
      case 'LoginComponent':
        const { LoginComponent } = await import("@modules/auth/page/login/login.component");
        component.clear();
        const refLogin = component.createComponent(LoginComponent);
        refLogin.instance._disable=true;
        refLogin.changeDetectorRef.detectChanges();
        break;
      case 'AuthLayoutComponent':
        const { AuthLayoutComponent } = await import("@layout/auth-layout/auth-layout.component");
        component.clear();
        const refAuthLayout = component.createComponent(AuthLayoutComponent);
        setTimeout(() => this.currContentSubject.next(refAuthLayout.instance.contentComponent),1000);
        refAuthLayout.changeDetectorRef.detectChanges();
        break;

      case 'CalendarLayoutComponent':
        const { CalendarLayoutComponent } = await import("@layout/calendar-layout/calendar-layout.component");
        component.clear();
        const refCalendarLayout = component.createComponent(CalendarLayoutComponent);
        setTimeout(() => this.currContentSubject.next(refCalendarLayout.instance.calendarComponent),1000);
        refCalendarLayout.changeDetectorRef.detectChanges();
        break;

      case 'CalendarComponent':
        const { CalendarComponent } = await import('@modules/calendar/component/calendar/calendar.component')
        component.clear();
        const refCalendar = component.createComponent(CalendarComponent);
        console.log(refCalendar)
        refCalendar.instance._disable=true;
        refCalendar.changeDetectorRef.detectChanges();
        break;

      case 'RegisterComponent':
        const { RegisterComponent } = await import("@modules/auth/page/register/register.component")
        component.clear();
        const refRegister = component.createComponent(RegisterComponent);
        refRegister.instance._disable=true;
        refRegister.changeDetectorRef.detectChanges();
        break;
      default:
        console.log('error: ', layout);
        break;
    }
  }

  public async getComponent(component : string){
    switch(component){
      case 'LoginComponent':
        const { LoginComponent } = await import("@modules/auth/page/login/login.component");
        return LoginComponent;
      case 'AuthLayoutComponent':
        const { AuthLayoutComponent } = await import("@layout/auth-layout/auth-layout.component");
        return AuthLayoutComponent;
      case 'RegisterComponent':
        const { RegisterComponent } = await import("@modules/auth/page/register/register.component")
        return RegisterComponent;
      default:
        console.log('error: ', component);
        return 'Error'
    }
  }
}
