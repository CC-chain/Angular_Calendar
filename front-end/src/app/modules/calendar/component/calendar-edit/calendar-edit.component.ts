import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomMetaInterface, SiteService } from '@app/data/schema/data';
import { DataCsService } from '@app/data/service/data-cs.service';
import { LoadingService } from '@app/shared/service/loading/loading.service';
import { faSleigh } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { getRandomId } from '@syncfusion/ej2/base';
import { CalendarEvent } from 'angular-calendar';
import { Observable, Subject, timestamp } from 'rxjs';

@Component({
  selector: 'app-calendar-edit',
  templateUrl: './calendar-edit.component.html',
  styleUrls: ['./calendar-edit.component.scss']
})
export class CalendarEditComponent implements OnInit {
  @Input() modalData!: { action: string, event: CalendarEvent<CustomMetaInterface> };
  @Input() get locale() {
    return this._locale;
  }
  set locale(val) {
    this._locale = val;
    this.translateService.use(val);
  }

  @Output() onChangeEvent = new EventEmitter<CalendarEvent<CustomMetaInterface>>();
  refresh = new Subject<void>();
  siteService!: Observable<SiteService[]>
  services!: SiteService[];
  isLoaded = this.loader.loading$;

  private _locale!: string;
  form: FormGroup = new FormGroup({
    start: new FormControl(),
    siteService: new FormControl(''),
    userNote: new FormControl('')
  });
  submitted = false;


  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      console.log(this.form)
      return;
    }
    this.modalData.event.meta!.siteServiceId = this.f['siteService'].value
    this.onChangeEvent.emit(this.modalData.event)
  }

  constructor(private formBuilder: FormBuilder, private translateService: TranslateService,
    private dataService: DataCsService, private loader: LoadingService) { }

  ngOnInit(): void {
    this.fetchSiteService();
    this.form = this.formBuilder.group(
      {
        start: [, Validators.required],
        siteService: ['', Validators.required],
        userNote: ['', Validators.required],
      }, { validators: this.dateLessThan('start', 'end') }
    )
  }

  dateLessThan(from: string, to: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let f = new Date(group.controls[from].value);
      let t = new Date(group.controls[to].value);

      if (f > t) {
        console.log(f, t)
        return {
          dates: "Date start should be less than Date end"
        };
      }
      return {};
    }
  }

  eventChange(event: any, prop: string) {
    switch (prop) {
      case 'start':
        this.modalData.event.start = event;
        break
      case 'siteService':
        let min: number = 0
        event = this.services.find(service =>
          service.id === Number(event.target.value.trim().split(" ").slice(-1)[0]));
          console.log(event)
        if (event) {
          if (event.breakAfter && event.breakAfterDuration) {
            min += event.breakAfterDuration;
          }

          min += event.duration;
          console.log(new Date(this.modalData.event.start).getTime() ,'asdasd')
          this.modalData.event.end = new Date((new Date(this.modalData.event.start)).getTime() + min * 60000);
          console.log(this.modalData.event.end)
        }
        break;
      case 'userNote':
        this.modalData.event.meta!.userMessage = event
        break;
    }
  }

  fetchSiteService() {
    this.siteService = this.dataService.getSiteService("SiteService/List")
    this.siteService.subscribe(data => {
      this.services = data;
    })
  }
}
