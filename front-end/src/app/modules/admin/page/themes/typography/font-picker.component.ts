import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { presetFonts } from '@app/data/schema/admin';
import { DataCsService } from '@app/data/service/data-cs.service';
import { ColorEvent } from 'ngx-color';
import { Font, FontInterface } from '@lib/font-picker/src/public-api';
import { Subject } from 'rxjs';
import { DataCs } from '@app/data/schema/data';

@Component({
  selector: 'app-font-picker',
  templateUrl: './font-picker.component.html',
  styleUrls : ['./font-picker.component.scss'],
})
export class FontPickerComponent {
  @Input() public get $styleElement(): any {
    return this.styleElement;
  };
  public set $styleElement(value: any) {
    this.styleElementSubject.next(value);
  }
  @Output() styleElementChange = new EventEmitter();

  public styleElement!: any;
  private styleElementSubject: Subject<any> = new Subject<any>();
  private _presetFonts = presetFonts;
  public presetFonts = this._presetFonts;

  @Input() font: Font = new Font({
    family: 'Roboto',
    size: '14px',
    style: 'regular 300',
    styles: ['regular']
  });

  public sizeSelect: boolean = true;
  public styleSelect: boolean = true;

  constructor(@Inject(DOCUMENT) private document: HTMLDocument,
    private renderer: Renderer2, detect: ChangeDetectorRef, private dataCsService: DataCsService) {
    this.styleElementSubject.subscribe((value: any) => {
      this.styleElement = value;
    })
  }

  onFontChange(event : any ){
    console.log(event)
    let dataEvent = this.convertFontToString(event);
    console.log(dataEvent);
    this.styleElementSubject.next(dataEvent);
    this.styleElementChange.emit(dataEvent)
  }

  private convertFontToString(font : any): string{
    let fontCss : string = `${font['font-style']} ${font['font-weight']} ${font['font-size']} ${font['font-family']}`
    return fontCss;
  }

}
