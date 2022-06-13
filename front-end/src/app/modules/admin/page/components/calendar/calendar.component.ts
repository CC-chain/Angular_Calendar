import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CalendarConfig, SiteService } from '@app/data/schema/data';
import { DataCsService } from '@app/data/service/data-cs.service';
import { LoadingService } from '@app/shared/service/loading/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class ComponentCalendar implements OnInit {

  data!: Observable<CalendarConfig>;
  siteService!: Observable<SiteService[]>
  events!: SiteService[];
  config!: CalendarConfig;
  excludeDaysArr = [false,false,false,false,false,false,false]
  holidaysArr = [false,false,false,false,false,false,false]

  isLoaded = this.loader.loading$;

  constructor(private dataService : DataCsService, private loader : LoadingService) { }

  ngOnInit(): void {
    this.getCalendarConfiguration()
  }

  onSubmit(){
    this.config.excludeDays = [];
    this.config.weekendDays= [];
    this.excludeDaysArr.forEach((value,index) => {
      if(value == true){
        this.config.excludeDays.push(index)
      }
    })
    this.holidaysArr.forEach((value,index) => {
      if(value == true){
        this.config.weekendDays.push(index);
      }
    })
    this.dataService.editCalendarConfig(this.config,"Component/CalendarConfiguration").subscribe(data => console.log(data))
  }

  getCalendarConfiguration(){
    this.loader.show();
    this.data = this.dataService.getCalendarConfig("Component/CalendarConfiguration")
    this.data.subscribe(data => {
      this.config = data;
      console.log(data)
    })
    var interval = setInterval(() => {
      if (this.config) {
        this.loader.hide();
        this.config.excludeDays.forEach(exclude => {
          this.excludeDaysArr[exclude] = true;
        })
        this.config.weekendDays.forEach(weekend => {
          this.holidaysArr[weekend] = true;
        })
        clearInterval(interval);
      } else {
        console.log("gelmedi")
      }
    }, 1000)

  }

   getSiteService(){
    this.loader.show();
    this.siteService = this.dataService.getSiteService("SiteService/List")
    this.siteService.subscribe(data => {
      this.events = data;
      console.log(data)
    })
    var interval = setInterval(() => {
      if (this.events) {
        this.loader.hide();
        clearInterval(interval);
      } else {
        console.log("gelmedi")
      }
    }, 1000)

  }

  changeSiteService(event : any){
    this.dataService.editSiteService(event,"SiteService/Update").subscribe(data => console.log(data));
  }

  addSiteService(event: any){
    this.dataService.addSiteService(event,"SiteService/Insert").subscribe(data => console.log(data));
    this.getSiteService()
  }

  removeSiteService(event : any){
    this.dataService.deleteSiteService(event.id, "SiteService/Delete").subscribe(data => console.log(data));
    this.getSiteService()
  }
}
