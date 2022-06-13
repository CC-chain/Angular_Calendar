import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomCs } from '@app/data/schema/data';
import { DataCsService } from '@app/data/service/data-cs.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-web-pages',
  templateUrl: './web-pages.component.html',
  styleUrls: ['./web-pages.component.scss']
})
export class WebPagesComponent implements OnInit {

  customs! : Observable<CustomCs[]>
  customsStr = `\n  <app-custom [script]="context.script" [style]="context.style" [contextID]="context.id"> </app-custom> `
  activeRoute = "";
  constructor(private route : ActivatedRoute,
    private router : Router,
    private dataService : DataCsService) {
      this.route.params.subscribe(params => this.getActiveRouterValue(params));
     }

  ngOnInit(): void {
    this.customs = this.dataService.getCustoms("Component/WebPage");
  }

  getActiveRouterValue(params : any){
    if(params['term'])
    this.activeRoute = params['term'];
  }



}
