import { Component, OnInit } from '@angular/core';
import { CustomCs } from '@app/data/schema/data';
import { DataCsService } from '@app/data/service/data-cs.service';
import { LoadingService } from '@app/shared/service/loading/loading.service';
import { isObservable } from 'rxjs';

@Component({
  selector: 'app-web-pages',
  templateUrl: './web-pages.component.html',
  styleUrls: ['./web-pages.component.scss']
})
export class WebPagesComponent implements OnInit {
  isLoaded = this.loaded.loading$;
  customs: CustomCs[] = [];
  constructor(private dataCsService: DataCsService,
    public loaded: LoadingService,) { }

  ngOnInit(): void {
    this.getCustoms()
  }

  getCustoms(dbUrl?: string) {
    this.loaded.show();
    this.dataCsService.getCustoms(dbUrl ? dbUrl : 'Component/WebPage').subscribe((value) => {
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

  addCustoms(customObj: any, dbUrl: string) {
    console.log(this.customs)
    this.customs.push(customObj)
    console.log(this.customs)
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

}
