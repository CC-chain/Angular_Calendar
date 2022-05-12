import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { DataCsService } from '@app/data/service/data-cs.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-font-picker',
  templateUrl: './font-picker.component.html',
})
export class FontPickerComponent {
  @Input() public get $styleElement(): any{
    return this.styleElement;
  };
  public set $styleElement(value : any){
    this.styleElementSubject.next(value);
  }
  @Output() styleElementChange = new EventEmitter();
  @Input() colorPickr!: string;

  public styleElement!: any;
  private styleElementSubject: Subject<any> = new Subject<any>();

  constructor( @Inject(DOCUMENT) private document: HTMLDocument,
    private renderer: Renderer2, detect: ChangeDetectorRef, private dataCsService : DataCsService){
      this.styleElementSubject.subscribe( (value: any) => {
        console.log("girdi",JSON.stringify(value))
        this.styleElement = value;
      })
    }

  changeColor(cur:ColorEvent){
    let curEvent = cur.color.rgb;
    let curRgba = `rgba(${curEvent.r},${curEvent.g},${curEvent.b},${curEvent.a})`
    let curObj: any = {};
    console.log("first",this.styleElement)
    for(var key in this.styleElement){
      if( this.styleElement.hasOwnProperty(key) && /([\w]+|)[Cc]olor$/g.test(key)){
        curObj[key] = curRgba;
      }

      if(this.styleElement.hasOwnProperty(key) && /^([Nn]ame)$|^([Ii]d)$/g.test(key) ){
        curObj[key] = this.styleElement[key];
      }
    }
    console.log("last",curObj);
    this.styleElementSubject.next(curObj);
    this.styleElementChange.emit(this.styleElement);
    console.log("firs2",JSON.stringify(this.styleElement))

  }

}
