import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Inject, Input, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { DataCs } from '@app/data/schema/data';
import { DataCsService } from '@app/data/service/data-cs.service';
import {getStyle, rgbToHex, hexToRgb} from '@coreui/utils/src'
import { ColorEvent } from 'ngx-color';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-app-theme-color',
  templateUrl: './app-theme-color.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppThemeColorComponent {
  @Input() public get color(): string {
    return this.backgroundColor;
  };
  public set color(value: string) {
    this.backgroundColorChange.next(value);
  }

  @Input() styleElement!: DataCs;

  public backgroundColor!: string;
  private backgroundColorChange: Subject<string> = new Subject<string>();

  constructor( @Inject(DOCUMENT) private document: HTMLDocument,
    private renderer: Renderer2, detect: ChangeDetectorRef, private dataCsService : DataCsService){
      this.backgroundColorChange.subscribe( (value:string) => {
        this.backgroundColor = value;
        this.styleElement.backgroundColor = value;
        this.dataCsService.editStyles(this.styleElement).subscribe(res => console.log("başarılı: ",res));
      })
    }

  ngAfterViewInit(){
    console.log(this.backgroundColor)
  }

  changeColor(cur:ColorEvent){
    let curEvent =cur.color.rgb;
    let curRgba = `rgba(${curEvent.r},${curEvent.g},${curEvent.b},${curEvent.a})`
    this.backgroundColorChange.next(curRgba);
    console.log(this.backgroundColor);
  }


  updateStyle(){
    this.styleElement.backgroundColor = this.backgroundColor;
  }

}
