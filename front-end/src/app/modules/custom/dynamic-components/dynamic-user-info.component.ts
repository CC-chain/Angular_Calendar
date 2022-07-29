import { Component, Input, OnInit } from '@angular/core';
import { User } from '@app/data/schema/data';
import { DataCsService } from '@app/data/service/data-cs.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'user-info',
  templateUrl: './dynamic-user-info.component.html',
  styleUrls: ['./dynamic-user-info.component.scss']
})
export class DynamicUserInfoComponent implements OnInit {
  @Input() info: any;

  constructor(private data : DataCsService) {
  }

  ngOnInit(): void {

  }


}
