import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '@core/service/theme.service';
import { environment } from '@env';
import { ActivatedRoute, Router} from '@angular/router';
import { AuthService } from '@core/service/auth.service';
import { CustomCs } from '@app/data/schema/data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() customs! : any;
  @Input() user! : any;
  customsStr = `\n  <app-custom [script]="context.script" [style]="context.style" [contextID]="context.id"> </app-custom> `
  ngOnInit() {

  }

  getCustomInfos(custom : CustomCs){
    console.log(this.user)
    if(this.user)
    return {script : custom.script , style : custom.style , id : custom.id , user : this.user}

    return {script : custom.script , style : custom.style , id : custom.id}
  }
}
