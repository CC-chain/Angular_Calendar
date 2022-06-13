import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { getStyle } from '@coreui/utils/src';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { DashboardInfos } from '@app/modules/admin/page/dashboard/component/dashboard.component';
import { GetMonthly } from '@app/data/schema/data';

@Component({
  selector: 'app-widgets-dropdown',
  templateUrl: './widgets-dropdown.component.html',
  styleUrls: ['./widgets-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WidgetsDropdownComponent implements OnInit, AfterContentInit {

  @Input() infos!: DashboardInfos;

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  data: any[] = [];
  options: any[] = [];
  labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  datasets = [
    [{
      label: 'My First dataset',
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,255,255,.55)',
      pointBackgroundColor: getStyle('--cui-primary'),
      pointHoverBorderColor: getStyle('--cui-primary'),
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    }], [{
      label: 'My Second dataset',
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,255,255,.55)',
      pointBackgroundColor: getStyle('--cui-info'),
      pointHoverBorderColor: getStyle('--cui-info'),
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    }],
    [{
      label: 'My Fourth dataset',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98],
      barPercentage: 0.7
    }]
  ];
  optionsDefault = {
    plugins: {
      legend: {
        display: false
      }
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          display: false
        }
      },
      y: {
        min: -8,
        max: 100,
        display: false,
        grid: {
          display: false
        },
        ticks: {
          display: false
        }
      }
    },
    elements: {
      line: {
        borderWidth: 1,
        tension: 0.4
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4
      }
    }
  };

  ngOnInit(): void {
    this.setData();
  }

  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();

  }

  setData() {
    for (let idx = 0; idx < 3; idx++) {
      this.data[idx] = {
        labels: this.labels,
        datasets: this.datasets[idx]
      };
      console.log(this.data)
      if (idx == 0) {
        if (this.infos.monthlyUserSummary && this.infos.monthlyUserSummary.length > 0) {
          this.data[idx].datasets[0].data = this.fillMonths(this.infos.monthlyUserSummary);
        }
      }
      if (idx == 1) {
        if (this.infos.monthlyIncomeSummary && this.infos.monthlyIncomeSummary.length > 0) {
          this.data[idx].datasets[0].data = this.fillMonths(this.infos.monthlyIncomeSummary);
        }
      }
        if (idx == 2) {
        if (this.infos.monthlyReservationSummary && this.infos.monthlyReservationSummary.length > 0) {
          this.data[idx].datasets[0].data = this.fillMonths(this.infos.monthlyReservationSummary);
        }
      }
    }
    this.setOptions();
  }


  fillMonths(data?: GetMonthly[]) {
    let months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    if (data)
      data.forEach((data) => {
        console.log(data.month, data.total)
        months[data.month - 1] = data.total;
      })
    console.log(months)
    return months;
  }

  getTotal(data : GetMonthly[]){
    let total = 0;
    data.forEach((data) => total += data.total);
    return total
  }

  getPercentage(data : GetMonthly[]){
    let result = "0";
    if(data.length > 1){
      let lastMonth = data[data.length - 1].total;
      let beforeMonth = data[data.length - 2].total;
      result = (((lastMonth-beforeMonth)/beforeMonth)*100).toFixed(2);
    }
    return result;
  }

  setOptions() {
    for (let idx = 0; idx < 3; idx++) {
      const options = JSON.parse(JSON.stringify(this.optionsDefault));
      switch (idx) {
        case 0: {
          this.options.push(options);
          break;
        }
        case 1: {
          options.scales.y.min = -8;
          options.scales.y.max = 3000;
          this.options.push(options);
          break;
        }
        case 2: {
          options.scales.x.grid = { display: false, drawTicks: false };
          options.scales.x.grid = { display: false, drawTicks: false, drawBorder: false };
          options.scales.y.min = undefined;
          options.scales.y.max = undefined;
          options.elements = {};
          this.options.push(options);
          break;
        }
      }
    }
  }
}

@Component({
  selector: 'app-chart-sample',
  template: '<c-chart type="line" [data]="data" [options]="options" width="300" #chart></c-chart>'
})
export class ChartSample implements AfterViewInit {

  constructor() { }

  @ViewChild('chart') chartComponent!: ChartjsComponent;

  colors = {
    label: 'My dataset',
    backgroundColor: 'rgba(77,189,116,.2)',
    borderColor: '#4dbd74',
    pointHoverBackgroundColor: '#fff'
  };

  labels = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  data = {
    labels: this.labels,
    datasets: [{
      data: [65, 59, 84, 84, 51, 55, 40],
      ...this.colors,
      fill: { value: 65 }
    }]
  };

  options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    elements: {
      line: {
        tension: 0.4
      }
    }
  };

  ngAfterViewInit(): void {
    setTimeout(() => {
      const data = () => {
        return {
          ...this.data,
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: [{
            ...this.data.datasets[0],
            data: [42, 88, 42, 66, 77],
            fill: { value: 55 }
          }, { ...this.data.datasets[0], borderColor: '#ffbd47', data: [88, 42, 66, 77, 42] }]
        };
      };
      const newLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
      const newData = [42, 88, 42, 66, 77];
      let { datasets, labels } = { ...this.data };
      // @ts-ignore
      const before = this.chartComponent?.chart?.data.datasets.length;
      console.log('before', before);
      // console.log('datasets, labels', datasets, labels)
      // @ts-ignore
      // this.data = data()
      this.data = {
        ...this.data,
        datasets: [{ ...this.data.datasets[0], data: newData }, {
          ...this.data.datasets[0],
          borderColor: '#ffbd47',
          data: [88, 42, 66, 77, 42]
        }],
        labels: newLabels
      };
      // console.log('datasets, labels', { datasets, labels } = {...this.data})
      // @ts-ignore
      setTimeout(() => {
        const after = this.chartComponent?.chart?.data.datasets.length;
        console.log('after', after);
      });
    }, 5000);
  }
}
