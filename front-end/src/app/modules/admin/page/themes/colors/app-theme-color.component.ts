import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Inject, Input, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import {getStyle, rgbToHex, hexToRgb} from '@coreui/utils/src'
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
  @ViewChild('bg', {static : true, read: ElementRef}) private bg!: ElementRef;
  @HostBinding('style.display') display = 'contents';
  public backgroundColor!: string;
  private backgroundColorChange: Subject<string> = new Subject<string>();

  constructor( @Inject(DOCUMENT) private document: HTMLDocument,
    private renderer: Renderer2, detect: ChangeDetectorRef){
      this.backgroundColorChange.subscribe( (value:string) => {
        this.backgroundColor = value;
        this.changeInfo();
      })
    }

  ngAfterViewInit(){
   this.backgroundColor= this.color;
   console.log(this.color)
   this.themeColors();
  }

  changeColor(cur:Event){
    this.backgroundColorChange.next((cur.target as HTMLInputElement).value.toString());
  }
  changeInfo(): void{
    const isElExists: ElementRef = this.bg.nativeElement.parentNode.querySelector("table");
    if(this.backgroundColor && isElExists ){
    this.bg.nativeElement.parentNode.querySelector(".bgColor").innerHTML = hexToRgb(this.backgroundColor);
    this.bg.nativeElement.parentNode.querySelector(".rgbToHex").innerHTML = this.backgroundColor;
    }
  }




  public themeColors(): void {
        this.backgroundColor = getStyle('background-color', this.bg.nativeElement);
        const table = this.renderer.createElement('table');
        table.innerHTML = `
          <table class='table w-100 tableExists '>
            <tr>
              <td class='text-muted'>HEX:</td>
              <td class='font-weight-bold rgbToHex'>${rgbToHex(this.backgroundColor)}</td>
            </tr>
            <tr>
              <td class='text-muted'>RGB:</td>
              <td class='font-weight-bold bgColor'>${this.backgroundColor}</td>
            </tr>
          </table>
        `;
        this.renderer.appendChild(this.bg.nativeElement.parentNode, table);
        // @ts-ignore
        // el.parentNode.appendChild(table);
  }

}
