import { Component, Input, OnInit } from '@angular/core';
import { CustomCs, User } from '@app/data/schema/data';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() customs! : CustomCs[] | undefined;
  @Input() user! : any;
  constructor() { }
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
