import { Component, OnInit } from '@angular/core';
import { CustomCs, User } from '@app/data/schema/data';
import { DataCsService } from '@app/data/service/data-cs.service';
import { LoadingService } from '@app/shared/service/loading/loading.service';
import { isObservable } from 'rxjs';

@Component({
  selector: 'app-header-footer',
  templateUrl: './header-footer.component.html',
  styleUrls: ['./header-footer.component.scss']
})
export class HeaderFooterComponent implements OnInit {
 isLoaded = this.loaded.loading$;
  customs: CustomCs[] = [];
  user!: User;
  constructor(private dataCsService: DataCsService,
    public loaded: LoadingService,) { }

  ngOnInit(): void {

    this.getUser();
    this.getCustoms()
  }

  getUser(){
      this.loaded.show();
    let id = localStorage.getItem('id_user');
    if(id)
    this.dataCsService.getUser(Number(id),"User/Get").subscribe(data => {
      if(!isObservable(data)){
        this.user = data;
        this.loaded.hide();
      }
    })
    else
    this.loaded.hide();
  }

  getCustoms(dbUrl?: string) {
    this.loaded.show();
    this.dataCsService.getCustoms(dbUrl ? dbUrl : 'Component/Custom').subscribe((value) => {
      if(!isObservable(value))
      this.customs = value;
      this.loaded.hide();
    });
  }

  public editCustoms(customObj: any, dbUrl: string) {
    console.log('edit', customObj, dbUrl)
    this.customs.map((customsObj: any) => {

      if (customsObj.name === customObj.name) {
        Object.keys(customsObj).map((key) => {
          if (customObj.hasOwnProperty(key)) {
            customsObj[key as keyof CustomCs] = customObj[key];
          }
        })
      }
    });

    this.dataCsService.editCustoms(this.customs, dbUrl).subscribe(data => console.log(data))
  }

  addCustoms(customObj: CustomCs, dbUrl: string) {
    this.customs.push(customObj)
    this.dataCsService.editCustoms(this.customs, dbUrl).subscribe(data => console.log(data))
  }

  deleteCustom(customObj: any, dbUrl: string) {
    this.customs = this.customs.filter(item => {
      if (item != null)
        return item.name !== customObj.name
      else
        return;
    })
    console.log(this.customs)
    this.dataCsService.editCustoms(this.customs, dbUrl).subscribe(data => console.log(data))
  }

  getUpdatedCustom(custom : CustomCs){
    if(this.user)
    custom.user = this.user
    console.log(custom)
    return custom;
  }

}
