import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faSleigh } from '@fortawesome/free-solid-svg-icons';
import { getRandomId } from '@syncfusion/ej2/base';
import { CalendarEvent } from 'angular-calendar';
import { Subject, timestamp } from 'rxjs';

@Component({
  selector: 'app-calendar-edit',
  templateUrl: './calendar-edit.component.html',
  styleUrls: ['./calendar-edit.component.scss']
})
export class CalendarEditComponent implements OnInit {

  @Input() modalData!:  {action : string , event : CalendarEvent};
  @Output() onChangeEvent = new EventEmitter<CalendarEvent>();
  refresh = new Subject<void>();

  form: FormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl(''),
    title: new FormControl(''),
    resizableBeforeStart : new FormControl(''),
    resizableAfterEnd: new FormControl(''),
    colors: new FormControl(''),
  });
  submitted = false;


  get f(): {[key:string] : AbstractControl}{
    return this.form.controls;
  }

   onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log(this.modalData.event)
    this.onChangeEvent.emit(this.modalData.event)
  }

  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        start: [,Validators.required],
        end: ['',Validators.required],
        title: ['',Validators.required],
        resizableBeforeStart: ['',Validators.required],
        resizableAfterEnd: ['',Validators.required],
        colors: ['',Validators.required]
      }
    )
  }

  eventChange(event: any , prop : string){
    switch(prop){
      case 'color':
        this.modalData.event.color!.primary = event;
        this.modalData.event.color!.secondary = event
        break;
      case 'afterEnd':
        this.modalData.event.resizable!.afterEnd = event;
        break;
      case 'beforeStart':
        this.modalData.event.resizable!.beforeStart = event
        break;
      case 'start':
        this.modalData.event.start = new Date(event);
        break
      case 'end':
        this.modalData.event.end = new Date(event);
        break;
    }
    console.log(this.modalData.event)
  }
}
