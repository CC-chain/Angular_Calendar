import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CustomCs } from '@app/data/schema/data';
import { CustomComponent } from '@app/modules/custom/custom/custom.component';
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
  @Output() customElementChange = new EventEmitter();
  htmlEl: string = "";
  scriptEl: string = "";
  nameEl: string = "";
  customHook: SelectorHookParserConfig[] = [
    {
      component: CustomComponent
    }
  ]

  constructor() { }

  onUpdate() {

    let newCustomCs!: CustomCs;
    if (this.htmlEl.length > 0 &&
      this.scriptEl.length > 0 &&
      this.nameEl.length > 0) {
      newCustomCs = {
        id: 999,
        content: this.htmlEl,
        targetComponent: this.targetComponent,
        script: this.scriptEl,
        dependentComponents: 'CustomComponent',
        layout: 'AuthLayoutComponent',
        name: this.nameEl,
      };
    }
    this.clearInputs();

    this.customElementChange.emit(newCustomCs)
  }

  clearInputs(){
    this.htmlEl="";
    this.scriptEl="";
    this.nameEl="";
  }

  ngOnInit(): void {

  }

}
