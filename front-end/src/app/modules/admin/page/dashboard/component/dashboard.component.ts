import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DashboardChartDataService } from '@modules/admin/service/dashboard-charts-data';
import { IChartProps } from '@modules/admin/interface/IChartProps'
import { IUser } from '@modules/admin/interface/IUser'
import { CustomMetaInterface, Employee, GetMonthly, GetWeekSummary, SiteService, SiteServiceSummary, User } from '@app/data/schema/data';
import { CalendarEvent } from 'angular-calendar';
import { DataCsService } from '@app/data/service/data-cs.service';
import { LoadingService } from '@app/shared/service/loading/loading.service';


export interface DashboardInfos {
  lastActiveUsers: User[] | undefined,
  calculatedIncome: any,
  weeklySummary: GetWeekSummary | undefined,
  monthlyUserSummary: GetMonthly[] | undefined,
  monthlyIncomeSummary: GetMonthly[] | undefined,
  monthlyReservationSummary: GetMonthly[] | undefined,
}

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private chartsData: DashboardChartDataService, private dataService: DataCsService,
    private loader: LoadingService) {
  }
  isLoaded = this.loader.loading$;
  public users!: User[];
  public employees!: Employee[];
  public reservations!: CalendarEvent<CustomMetaInterface>[];
  public siteService!: SiteService[];
  public mainChart: IChartProps = {};
  public chart: Array<IChartProps> = [];
  public dashboardInfos: DashboardInfos = {
    calculatedIncome: 0,
    monthlyIncomeSummary: undefined,
    lastActiveUsers: undefined,
    monthlyReservationSummary: undefined,
    monthlyUserSummary: undefined,
    weeklySummary: undefined
  };
  public trafficRadioGroup = new FormGroup({
    trafficRadio: new FormControl('Month')
  });

  ngOnInit(): void {
    this.loader.show();
    this.getDashboard();
    this.initCharts();
    this.getEmployee();
    let wait = setInterval(() => {
      if (
        typeof this.dashboardInfos.lastActiveUsers != 'undefined' &&
        typeof this.dashboardInfos.monthlyIncomeSummary != 'undefined' &&
        typeof this.dashboardInfos.monthlyReservationSummary != 'undefined' &&
        typeof this.dashboardInfos.monthlyUserSummary != 'undefined' &&
        typeof this.dashboardInfos.weeklySummary != 'undefined'
      ) {
        this.loader.hide();
        clearInterval(wait);
      }

    }, 200);
  }

  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
    console.log(this.mainChart)
  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.chartsData.initMainChart(value);
    this.initCharts();
  }

  addEmployee(event: any) {
    this.dataService.addEmployee(event, "Employee/Insert").subscribe(data => console.log(data));
    this.getEmployee();
  }

  getEmployee() {
    this.dataService.getEmployee("Employee/List").subscribe(data => this.employees = data);
  }

  deleteEmployee(emp : any){
    this.dataService.deleteEmployee(emp.id,"Employee/Delete").subscribe(data => console.log(data))
    this.getEmployee();
  }


  getDashboard() {
    this.dataService.getDashboard<GetWeekSummary>("Dashboard/GetWeeklySummary").subscribe(data =>
      this.dashboardInfos.weeklySummary = data);
    this.dataService.getDashboard<GetMonthly[]>("Dashboard/GetMonthlyUserSummary").subscribe(data =>
      this.dashboardInfos.monthlyUserSummary = data);
    this.dataService.getDashboard<GetMonthly[]>("Dashboard/GetMonthlyIncomeSummary").subscribe(data =>
      this.dashboardInfos.monthlyIncomeSummary = data);
    this.dataService.getDashboard<GetMonthly[]>("Dashboard/GetMonthlyReservationSummary").subscribe(data =>
      this.dashboardInfos.monthlyReservationSummary = data);
    this.dataService.getDashboard<User[]>("Dashboard/GetLastActiveUsers").subscribe(data =>
      this.dashboardInfos.lastActiveUsers = data);

  }

  getTotal(data: GetMonthly[] | SiteServiceSummary[]) {
    let total = 0;
    data.forEach((data) => total += data.total);
    return total
  }

  getPercentage(data: GetWeekSummary , day : number , isCompletedReservations : boolean) {
   let daySummary = data.daySummary
   let index =  daySummary.findIndex(data => {return data.day == day})
   if(index != -1){
     if(isCompletedReservations)
     return ((daySummary[index].completedTotal)/(daySummary[index].completedTotal + daySummary[index].cancelledTotal))* 100
     if(!isCompletedReservations)
     return ((daySummary[index].cancelledTotal)/(daySummary[index].completedTotal + daySummary[index].cancelledTotal))* 100
   }
   return 0;
  }



}
