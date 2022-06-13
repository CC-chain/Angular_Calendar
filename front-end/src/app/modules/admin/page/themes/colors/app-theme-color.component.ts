import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Inject, Input, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { DataCsService } from '@app/data/service/data-cs.service';
import { ColorEvent } from 'ngx-color';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-app-theme-color',
  templateUrl: './app-theme-color.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppThemeColorComponent {

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

  ngAfterViewInit(){
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
    this.styleElementSubject.next(curObj);
    this.styleElementChange.emit(this.styleElement);

  }

}
