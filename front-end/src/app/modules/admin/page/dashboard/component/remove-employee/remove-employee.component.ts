import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from '@app/data/schema/data';

@Component({
  selector: 'app-remove-employee',
  templateUrl: './remove-employee.component.html',
  styleUrls: ['./remove-employee.component.scss']
})
export class RemoveEmployeeComponent implements OnInit {
  @Input() data : any;
  @Output() removedData = new EventEmitter<Employee>();
  constructor() { }

  remove(event : any){
    this.removedData.emit(event);
  }
  ngOnInit(): void {
  }

}
