import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { CustomCs } from '@app/data/schema/data';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-custom-editor',
  templateUrl: './custom-editor.component.html',
  styleUrls: ['./custom-editor.component.scss'],
})
export class CustomEditorComponent implements OnInit {
  @Input() public get $customElement(): CustomCs {
    return this.customElement;
  }
  @Input() opened = false;
  public set $customElement(value: CustomCs) {
    this.customElementSubject.next(value);
  }
  @Output() customElementChange = new EventEmitter();
  @Output() customElementDelete = new EventEmitter();
  public customElement!: CustomCs;
  private customElementSubject: Subject<any> = new Subject<any>();
  constructor(private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document) {
    this.customElementSubject.subscribe((value: CustomCs) => {
      this.customElement = value
      //To trigger content sections
      this.customElement.content += " ";
      //

      this.customElement.script = value.script;
      this.customElement.style = value.style;
      this.customElement.content = value.content;
      console.log(this.customElement)

    })
  }
  faRemove = faRemove;
  customs = `\n  <app-custom [script]="context.script" [style]="context.style" [contextID]="context.id"> </app-custom> `
  onChange(val: any, specific: string) {
    if (val) {
      let newCustomCs = this.customElement;
      if (specific === "html")
        newCustomCs.content = val.target!.value;
      if (specific === "script")
        newCustomCs.script = val.target!.value;
      if (specific === "style")
        newCustomCs.style = val.target!.value;

      this.customElementSubject.next(newCustomCs)
    }
  }

  onUpdate() {
    this.customElementChange.emit(this.customElement)
  }

  deleteCustom() {
    this.customElementDelete.emit(this.customElement);
  }
  ngOnInit(): void {
  }

  clearScripts() {
    if (this.customElement.id) {
      const el = this._document.getElementById("style-" + this.customElement.id);
      if (el != null && typeof el != undefined) {
        this._renderer2.removeChild(this._document.head, el)
      }

    }
  }
}
