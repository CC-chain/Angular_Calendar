import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomCs } from '@app/data/schema/data';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-custom-editor',
  templateUrl: './custom-editor.component.html',
  styleUrls: ['./custom-editor.component.scss'],
})
export class CustomEditorComponent implements OnInit {
  @Input() public get $customElement() : CustomCs {
    return this.customElement;
  }
  public set $customElement(value: CustomCs) {
    this.customElementSubject.next(value);
  }
  @Output() customElementChange = new EventEmitter();
  @Output() customElementDelete = new EventEmitter();
  public customElement!: CustomCs;
  private customElementSubject: Subject<any> = new Subject<any>();
  constructor() {
     this.customElementSubject.subscribe((value: CustomCs) => {
      this.customElement = value;
    })
   }
   faRemove = faRemove;

   onChange(val : any, specific : string){
     if(val){
       let newCustomCs = this.customElement;
       if(specific === "html")
       newCustomCs.content = val.target!.value;
       if(specific === "js")
       newCustomCs.script = val.target!.value;
       this.customElementSubject.next(newCustomCs)
     }
   }

   onUpdate(){
     this.customElementChange.emit(this.customElement)
   }

   deleteCustom(){
     this.customElementDelete.emit(this.customElement);
   }
  ngOnInit(): void {
  }

}