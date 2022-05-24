import { Component, Input, OnInit } from '@angular/core';
import { DataCs } from '@app/data/schema/data';
import { DataCsService } from '@app/data/service/data-cs.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Input() _disable!: boolean;
  styles!: Observable<DataCs[]>;
  constructor(private dataCsService : DataCsService) { }

  ngOnInit(): void {
    this.styles = this.dataCsService.getStyles('Component/Register')
  }

}
