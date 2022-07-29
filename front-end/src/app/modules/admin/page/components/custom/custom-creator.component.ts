import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { CustomCs, User } from '@app/data/schema/data';
import { CustomComponent } from '@app/modules/custom/custom/custom.component';
import { DynamicLogoutButtonComponent } from '@app/modules/custom/dynamic-components/dynamic-logout-button.component';
import { DynamicProfileComponent } from '@app/modules/custom/dynamic-components/dynamic-profile.component';
import { DynamicUserInfoComponent } from '@app/modules/custom/dynamic-components/dynamic-user-info.component';
import { SelectorHookParserConfig } from 'ngx-dynamic-hooks';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-custom-creator',
  templateUrl: './custom-creator.component.html',
  styleUrls: ['./custom-creator.component.scss']
})
export class CustomCreatorComponent implements OnInit {
  @Input() modalId!: string | undefined ;
  @Input() targetComponent: string = "";
  @Input() layout : string = "AuthLayoutComponent";
  @Input() user!: User;
  @Output() customElementChange = new EventEmitter();
  htmlEl: string = "";
  scriptEl: string = "";
  styleEl : string = "";
  idEl : string = "";
  nameEl: string = "";
  customs = `\n  <app-custom [script]="context.script" [style]="context.style" [contextID]="context.id"> </app-custom> `
  @Input()opened : boolean = false;
  customHook: SelectorHookParserConfig[] = [
    {
      component: CustomComponent
    },
    {
      component : DynamicLogoutButtonComponent
    },
    {
      component : DynamicUserInfoComponent
    },
    {
      component : DynamicProfileComponent
    }
  ]
  constructor(private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document) {
    this.idEl = Math.floor(Math.random() * 10000).toString();
   }

  onUpdate() {

    let newCustomCs!: CustomCs;
      newCustomCs = {
        id: this.idEl,
        content: this.htmlEl.length > 0 ? this.htmlEl : "",
        targetComponent: this.targetComponent,
        script: this.scriptEl.length > 0 ? this.scriptEl : "",
        style : this.styleEl.length > 0 ? this.styleEl : "",
        dependentComponents: 'CustomComponent',
        layout: this.layout,
        name: this.nameEl,
      };
    this.clearInputs();

    this.customElementChange.emit(newCustomCs)
  }

  clearInputs(){
    this.htmlEl="";
    this.scriptEl="";
    this.styleEl="";
    this.nameEl="";
  }

  ngOnInit(): void {

  }

  clearScripts() {
    if (this.idEl) {
      const el = this._document.getElementById("style-" + this.idEl);
      if (el != null && typeof el != undefined) {
        this._renderer2.removeChild(this._document.head, el)
      }

    }
  }

  getCustomInfos(){
    console.log(this.user)
    if(this.user)
    return {script : this.scriptEl , style : this.styleEl , id : this.idEl , user : this.user}

    return {script : this.scriptEl , style : this.styleEl , id : this.idEl }
  }
}
