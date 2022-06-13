import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CalendarConfig, SiteService } from '@app/data/schema/data';

@Component({
  selector: 'app-calendar-events-edit',
  templateUrl: './calendar-events-edit.component.html',
  styleUrls: ['./calendar-events-edit.component.scss']
})
export class CalendarEventsEditComponent implements OnInit {
  @Input() data: SiteService = {
    breakAfter: false,
    description: '',
    duration: 0,
    currency: 0,
    breakAfterDuration: 0,
    name: '',
    price : undefined,
    color :'',
  };
  @Input() config!: CalendarConfig
  @Input() editOrAdd!: boolean;
  @Output() dataChange = new EventEmitter<SiteService>();
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    currency: new FormControl(0),
    duration: new FormControl(''),
    breakAfterWork: new FormControl(false),
    breakDuration: new FormControl(''),
    description: new FormControl(''),
    color : new FormControl(''),
  })


  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      breakDuration: [''],
      breakAfterWork: [false],
      price: [''],
      currency: [''],
      color: [''],
      duration: ['', Validators.required],
      description: ['', Validators.required],
    }, [{ validators: this.checkBreakAfterWork("breakDuration", "breakAfterWork") },
     { validators : this.checkHourDuration("duration")}])
  }

  checkHourDuration(duration : string){
    return (group: FormGroup): { [key: string]: any } => {
      let curDuration = group.controls[duration].value;
        if (!!!curDuration) {
          return {
            breakTrue: "You should choose a duration"
          }
        }
        else if (curDuration && /^\s*$/.test(curDuration)){
          if((Number(curDuration) % this.config.hourDuration) != 0)
          return {
           breakDuration : "You should select a number according to duration : " + this.config.hourDuration.toString()
          }
        }
      return {};
    }
  }

  checkBreakAfterWork(breakDuration: string, breakAfterWork: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let duration = group.controls[breakDuration].value;
      let isBreak = group.controls[breakAfterWork].value as boolean;
      if (isBreak) {
        if (!!!duration || /^\s*$/.test(duration)) {
          return {
            breakTrue: "You should choose a duration"
          }
        }
        else if (duration && /^\s*$/.test(duration)){
          if((Number(duration) % this.config.hourDuration) != 0)
          return {
           breakDuration : "You should select a number according to duration : " + this.config.hourDuration.toString()
          }
        }
      }
      return {};
    }
  }

  submitted = false;
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      console.log(this.form)
      return;
    }
    this.dataChange.emit(this.data);
  }
}
