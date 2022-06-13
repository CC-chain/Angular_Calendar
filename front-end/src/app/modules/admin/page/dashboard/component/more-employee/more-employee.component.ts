import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-more-employee',
  templateUrl: './more-employee.component.html',
  styleUrls: ['./more-employee.component.scss']
})
export class MoreEmployeeComponent implements OnInit {

  @Input() data : any;
  constructor() { }

  ngOnInit(): void {
  }

}
