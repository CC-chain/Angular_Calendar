import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DenemeService {
  color!: string;
  colorList = ["red","blue"];
  colorSubject = new BehaviorSubject<string>(this.getDefaultColor())
  constructor() {
   }

  private getDefaultColor(): string {
    this.color= this.colorList[0];
    return this.color;
  }

  set(val:string): void {
    this.color = val;
    this.colorSubject.next(this.color);
  }

  colorObservable(): Observable<string>{
    return this.colorSubject.asObservable();
  }

  getColorList(): string[] {
    return this.colorList;
  }
}
