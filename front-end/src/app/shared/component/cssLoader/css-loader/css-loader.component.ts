import { ChangeDetectionStrategy, ChangeDetectorRef, Component, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DenemeService } from '@app/shared/service/dynamic_css/deneme.service';

@Component({
  selector: 'app-css-loader',
  template:`<link rel="stylesheet" type="text/css" [href]="path">`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CssLoaderComponent {

  cssPath: any;

  constructor(public sanitizer: DomSanitizer, private cd: ChangeDetectorRef, private deneme: DenemeService) {
    this.deneme.colorObservable().subscribe(val => {
      this.cssPath = `assets/themes/${val}.css`
      console.log(this.cssPath);
      this.cd.markForCheck();
    })
  }

  set path(path){
    this.cssPath = path;
  }

  get path(){
    console.log(this.sanitizer.bypassSecurityTrustResourceUrl(this.cssPath));
    return this.sanitizer.bypassSecurityTrustResourceUrl("/"+this.cssPath);
  }
}
