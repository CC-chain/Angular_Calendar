import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataCs } from '@app/data/schema/data';
import { Subject } from 'rxjs';

interface ModalData {
  marginTop : RegExpMatchArray | null,
  marginRight :RegExpMatchArray | null,
  marginBottom :RegExpMatchArray | null,
  marginLeft :RegExpMatchArray | null,
  paddingTop :RegExpMatchArray | null,
  paddingRight :RegExpMatchArray | null,
  paddingBottom :RegExpMatchArray | null,
  paddingLeft :RegExpMatchArray | null,
  width :RegExpMatchArray | null,
  height :RegExpMatchArray | null,
  backgroundImage:any,
}


@Component({
  selector: 'app-style-editor',
  templateUrl: './style-editor.component.html',
  styleUrls: ['./style-editor.component.scss']
})
export class StyleEditorComponent implements OnInit {
  @Input() public get $styleElement(): DataCs {
    return this.styleElement;
  };

  public set $styleElement(value: DataCs) {
    this.styleElementSubject.next(value);
    this.transformData(value)
  }

  @Output() styleElementChange = new EventEmitter();
  public styleElement!: DataCs;
  private styleElementSubject: Subject<any> = new Subject<any>();
  private file!: File;

   modalData : ModalData = {
  marginTop :['unspecified', 'px'],
  marginRight :['unspecified', 'px'],
  marginBottom :['unspecified', 'px'],
  marginLeft :['unspecified', 'px'],
  paddingTop :['unspecified', 'px'],
  paddingRight :['unspecified', 'px'],
  paddingBottom :['unspecified', 'px'],
  paddingLeft :['unspecified', 'px'],
  width :['unspecified', 'px'],
  height :['unspecified', 'px'],
  backgroundImage:['unspecified', 'px'],
}




  constructor() {
    this.styleElementSubject.subscribe((value: DataCs) => {
      this.styleElement = value;
    })
  }

  transformData(styleElement : DataCs){
    if(styleElement){

      if(styleElement.width.length > 0)
      this.modalData.width = styleElement.width.match(/[\d\.]+|\D+/gi) ;
      if(styleElement.height.length > 0)
      this.modalData.height = styleElement.width.match(/[\d\.]+|\D+/gi);;
      if(styleElement.backgroundImage.length > 0)
      this.modalData.backgroundImage = styleElement.backgroundImage;

      styleElement.margin.split(" ").map((text,i) => {
        if(text.trim().length > 0){
          if(i == 0)
          this.modalData.marginTop = text.match(/[\d\.]+|\D+/gi);
          else if(i == 1)
          this.modalData.marginRight = text.match(/[\d\.]+|\D+/gi);
          else if(i == 2)
          this.modalData.marginBottom =text.match(/[\d\.]+|\D+/gi);
          else if(i == 3)
          this.modalData.marginLeft = text.match(/[\d\.]+|\D+/gi);
        }
      })
       styleElement.padding.split(" ").map((text,i) => {
         i = i + 4;
        if(text.trim().length > 0){
          if(i == 4)
          this.modalData.paddingTop = text.match(/[\d\.]+|\D+/gi);
          else if(i == 5)
          this.modalData.paddingRight = text.match(/[\d\.]+|\D+/gi);
          else if(i == 6)
          this.modalData.paddingBottom = text.match(/[\d\.]+|\D+/gi);
          else if(i == 7)
          this.modalData.paddingLeft = text.match(/[\d\.]+|\D+/gi);
        }
      }
      )
      console.log("geldi",styleElement, this.modalData)
    }
    }


  onChange(value : any){
    this.file = value.target.files[0];
  }

  onUpload(){
    let newStyle : DataCs = this.styleElement;
    let modalDataProps = Object.values(this.modalData)
    let newMargin : string = "";
    let newPadding : string = "";
    let counter = 0;

    for(let prop of modalDataProps){
      console.log(counter, prop)
      if(prop[0] !== "unspecified"){
        if(counter <= 3){
          newMargin += prop[0]+prop[1]+" "
        }else if(counter <= 7){
          newPadding += prop[0]+prop[1]+ " "
        }
      }else {
        if(counter <= 3){
          newMargin += '0 ';
        }else if(counter <= 7){
          newPadding += '0 ';
        }
      }
      counter++;
    }
    newStyle.padding = newPadding;
    newStyle.margin = newMargin;
    if(this.modalData.height && this.modalData.width){
    newStyle.height = this.modalData.height[0] + this.modalData.height[1];
    newStyle.width = this.modalData.width[0] + this.modalData.width[1];
    }
    console.log('bak',newStyle, newMargin)
    this.styleElementChange.emit(newStyle);
  }
  ngOnInit(): void {
  }

}
