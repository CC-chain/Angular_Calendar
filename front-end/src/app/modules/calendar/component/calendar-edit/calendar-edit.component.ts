import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomMetaInterface } from '@app/data/schema/data';
import { faSleigh } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { getRandomId } from '@syncfusion/ej2/base';
import { CalendarEvent } from 'angular-calendar';
import { Subject, timestamp } from 'rxjs';

@Component({
  selector: 'app-calendar-edit',
  templateUrl: './calendar-edit.component.html',
  styleUrls: ['./calendar-edit.component.scss']
})
export class CalendarEditComponent implements OnInit {

  @Input() modalData!: { action: string, event: CalendarEvent<CustomMetaInterface> };
  @Input() siteService!: any;
  @Input() get locale(){
    return this._locale;
  }
  set locale(val){
    this._locale = val;
    this.translateService.use(val);
  }

  @Output() onChangeEvent = new EventEmitter<CalendarEvent<CustomMetaInterface>>();
  refresh = new Subject<void>();
  private  _locale!: string;
  form: FormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl(''),
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
    this.onChangeEvent.emit(this.modalData.event)
  }

  constructor(private formBuilder: FormBuilder , private translateService : TranslateService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        start: [, Validators.required],
        end: ['', Validators.required],
        userNote: ['', Validators.required],
      }, {validators : this.dateLessThan('start','end')}
    )
  }

  dateLessThan(from: string, to: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let f = new Date(group.controls[from].value);
      let t = new Date(group.controls[to].value);

      if (f > t) {
      console.log(f,t)
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
      case 'end':
        this.modalData.event.end = event;
        break;
      case 'userNote':
        this.modalData.event.meta!.userMessage = event
        break;
    }
  }
}
