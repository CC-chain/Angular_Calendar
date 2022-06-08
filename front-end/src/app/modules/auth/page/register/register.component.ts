import { Component, Input, OnInit } from '@angular/core';
import { CustomCs, DataCs } from '@app/data/schema/data';
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
  customs! : CustomCs[]
  constructor(private dataCsService : DataCsService) { }

   customsStr = `\n  <app-custom [script]="context.script" [style]="context.style" [contextID]="context.id"> </app-custom> `

  ngOnInit(): void {
    this.dataCsService.getCustoms('Component/Custom').subscribe(data => this.customs = data)
    this.styles = this.dataCsService.getStyles('Component/Register')
  }

}
