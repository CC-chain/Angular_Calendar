import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class CustomComponent implements OnInit {

  @Input() get script() {
    return this._script
  }
  set script(value) {
    this._script = value;
    console.log(value);
    this.curScript = this.loadscript(value)
  }

  private _script: string = "";
  private curScript : any ;

  constructor(private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document) { }

  loadscript(script : string) {
    let scriptTag = this._renderer2.createElement('script');
    scriptTag.type = "text/javascript";
    scriptTag.async = true;
    scriptTag.text = script;
    console.log(script)
    this._renderer2.appendChild(this._document.body, scriptTag);
    //this._renderer2.removeChild(this._document.body,scriptTag);
    return scriptTag;
  }

  ngOnInit(): void {
  }

}
