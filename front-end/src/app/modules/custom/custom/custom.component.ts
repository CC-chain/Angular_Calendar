import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss'],
})
export class CustomComponent {

  @Input() get script() {
    return this._script
  }

  set script(value) {
    this._script = value;
    console.log(value);
    this.loadscript(value)
  }

  @Input() get style() {
    return this._style;
  }
  set style(value) {
    this._style = value;
    console.log(value)
    this.loadstyle(value)

  }
  @Input() get contextID(){
    return this._contextID;
  }

  set contextID(value) {
    this._contextID = value;
    console.log(this.contextID);
    if(this._style)
    this.loadstyle(this._style)
    if(this._script)
    this.loadscript(this._script)
  }

  private _contextID!: string;
  private _style: string = "";
  private _script: string = "";

  constructor(private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document) { }

  loadscript(script: string) {
    if(this._contextID){
    const el = this._document.getElementById('script-'+ this._contextID)
    if(el != null && typeof el != undefined){
      this._renderer2.removeChild(this._document.body,el)
    }

    let scriptTag = this._renderer2.createElement('script');
    this._renderer2.setProperty(scriptTag, "id", 'script-'+ this._contextID);
    scriptTag.type = "text/javascript";
    scriptTag.async = true;
    scriptTag.text = script;
    console.log(script)
    this._renderer2.appendChild(this._document.body, scriptTag);

  }
  }

  loadstyle(style: string) {
    if(this._contextID){
    const el = this._document.getElementById("style-"+ this._contextID);
    if (el != null && typeof el != undefined)  {
      this._renderer2.removeChild(this._document.head,el)
    }
      let styleTag = this._renderer2.createElement('style');
      let text = this._renderer2.createText(style);
      this._renderer2.setProperty(styleTag, "id", 'style-'+this._contextID);
      this._renderer2.appendChild(styleTag, text);
      styleTag.async = true;
      this._renderer2.appendChild(this._document.head, styleTag);
    }
  }


}
