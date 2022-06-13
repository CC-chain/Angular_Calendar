import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DataCs, IData } from '@app/data/schema/data';
import { DataCsService } from '@app/data/service/data-cs.service';
import { Subject } from 'rxjs';

interface ModalData {
  marginTop: RegExpMatchArray | null,
  marginRight: RegExpMatchArray | null,
  marginBottom: RegExpMatchArray | null,
  marginLeft: RegExpMatchArray | null,
  paddingTop: RegExpMatchArray | null,
  paddingRight: RegExpMatchArray | null,
  paddingBottom: RegExpMatchArray | null,
  paddingLeft: RegExpMatchArray | null,
  width: RegExpMatchArray | null,
  height: RegExpMatchArray | null,
  backgroundImage: any,
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

  modalData: ModalData = {
    marginTop: ['0', 'px'],
    marginRight: ['0', 'px'],
    marginBottom: ['0', 'px'],
    marginLeft: ['0', 'px'],
    paddingTop: ['0', 'px'],
    paddingRight: ['0', 'px'],
    paddingBottom: ['0', 'px'],
    paddingLeft: ['0', 'px'],
    width: ['0', 'px'],
    height: ['0', 'px'],
    backgroundImage: ['0', 'px'],
  }

  imageUrl!: string | undefined;



  constructor(private dataService: DataCsService, private sant: DomSanitizer) {
    this.styleElementSubject.subscribe((value: DataCs) => {
      this.styleElement = value;
    })
  }

  transformData(styleElement: DataCs) {
    if (styleElement) {

      if (styleElement.width.length > 0) {
        let newWidth = styleElement.width.match(/[\d\.]+|\D+/gi)
        this.modalData.width = newWidth && newWidth.length == 2 ? newWidth : this.modalData.width;
      }
      if (styleElement.height.length > 0) {
        let newHeight = styleElement.height.match(/[\d\.]+|\D+/gi)
        this.modalData.height = newHeight && newHeight.length == 2 ? newHeight : this.modalData.height;
      }
      if (styleElement.backgroundImage.length > 0)
        this.modalData.backgroundImage = styleElement.backgroundImage;

      styleElement.margin.split(" ").map((text, i) => {
        if (text.trim().length > 0) {
          let newText = text.match(/[\d\.]+|\D+/gi);
          if (i == 0) {
            this.modalData.marginTop = newText && newText.length == 2 ? newText : this.modalData.marginTop;
          }
          else if (i == 1)
            this.modalData.marginRight = newText && newText.length == 2 ? newText : this.modalData.marginRight;
          else if (i == 2)
            this.modalData.marginBottom = newText && newText.length == 2 ? newText : this.modalData.marginBottom;
          else if (i == 3)
            this.modalData.marginLeft = newText && newText.length == 2 ? newText : this.modalData.marginLeft;
        }
      })
      styleElement.padding.split(" ").map((text, i) => {
        i = i + 4;
        if (text.trim().length > 0) {
          let newText = text.match(/[\d\.]+|\D+/gi);
          if (i == 4)
            this.modalData.paddingTop = newText && newText.length == 2 ? newText : this.modalData.paddingTop;
          else if (i == 5)
            this.modalData.paddingRight = newText && newText.length == 2 ? newText : this.modalData.paddingRight;
          else if (i == 6)
            this.modalData.paddingBottom = newText && newText.length == 2 ? newText : this.modalData.paddingBottom;
          else if (i == 7)
            this.modalData.paddingLeft = newText && newText.length == 2 ? newText : this.modalData.paddingLeft;
        }
      }
      )
      console.log("geldi", styleElement, this.modalData)
    }
  }


  onChange(value: any) {
    this.file = value.target.files[0];
    this.imageUrl = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.file)) as string;
  }


  onUpload() {

    let fileURL = "";
    if (this.file && localStorage.getItem("id_site")) {
      let siteId = localStorage.getItem("id_site")!
      this.dataService.addImage(this.file, siteId, (this.file as File).name.toString(), "Image/UploadImage")
        .subscribe((data: any) => {
          if (data.success) {
            let newStyle = this.updateStyle();
            newStyle.backgroundImage = this.dataService.dataCsUrl.match(/^(.*\/\/)(.*?)\//g)![0] + "Images/" + (this.file as File).name.toString();
            this.styleElementChange.emit(newStyle);
          }
        })
    }
    else
      this.styleElementChange.emit(this.updateStyle());
  }
  ngOnInit(): void {
  }

  updateStyle() {
    let newStyle: DataCs = this.styleElement;
    let modalDataProps = Object.values(this.modalData)
    let newMargin: string = "";
    let newPadding: string = "";
    let counter = 0;

    for (let prop of modalDataProps) {
      console.log(counter, prop)
      if (prop[0] !== "unspecified" || prop.length >= 2) {
        console.log('girdi')
        if (counter <= 3) {
          newMargin += prop[0] + prop[1] + " "
        } else if (counter <= 7) {
          newPadding += prop[0] + prop[1] + " "
        }
      } else {
        if (counter <= 3) {
          newMargin += '0 ';
        } else if (counter <= 7) {
          newPadding += '0 ';
        }
      }
      counter++;
    }
    newStyle.padding = newPadding != "0px 0px 0px 0px " ? newPadding : "";
    newStyle.margin = newMargin != "0px 0px 0px 0px " ? newMargin : "";
    if (!!this.modalData.height && !!this.modalData.width) {
      newStyle.height = "";
      newStyle.width = "";

      if (this.modalData.height[0] != "0")
        newStyle.height = this.modalData.height[0] + this.modalData.height[1];
      if (this.modalData.width[0] != "0")
        newStyle.width = this.modalData.width[0] + this.modalData.width[1];
    }
    return newStyle;
  }

}
