import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, SimpleChanges, ChangeDetectorRef, Renderer2, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { tap, delay, finalize, catchError, filter, timeout } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, Subject, Subscription } from 'rxjs';
import {default_login} from '@data/schema/defaultData'

import { AuthService } from '@core/service/auth.service';
import { DataCsService } from '@app/data/service/data-cs.service';
import { CustomCs, DataCs, Site } from '@app/data/schema/data';
import { DOCUMENT } from '@angular/common';
import { DynamicImportService } from '@app/shared/service/dynamic_import/dynamic-import.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Input() _disable!: boolean;
  styles: Observable<DataCs[]> = of(default_login);
  sites!: Observable<Site[]>
  siteId!: any;
  customs!: Observable<CustomCs[]>
  error!: string;
  isLoading!: boolean;
  loginForm!: FormGroup;
   customsStr = `\n  <app-custom [script]="context.script" [style]="context.style" [contextID]="context.id"> </app-custom> `
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private dataCsService: DataCsService,
    private detector: ChangeDetectorRef,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private dynamicImport: DynamicImportService
  ) {
    this.buildForm();
  }

  get f() {
    return this.loginForm.controls;
  }



  login() {
    this.isLoading = true;

    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe(res => {
      if (res == true) {
        if (this.authService.isLoggedIn()) {
          this.isLoading = false;
          this.router.navigate(['/home/calendar']);
        }
      } else {
        window.location.reload()
      }
    })


  }

  private loaded = false;
  onChange(event: any) {
    if (event && event != this.siteId) {
      localStorage.setItem("id_site", event.toString());
      this.styles = this.dataCsService.getStyles('Component/Login')
      this.styles.subscribe(data => console.log(data))
      this.customs = this.dataCsService.getCustoms('Component/Custom')
      this.customs.subscribe(data => console.log(data));
      window.location.reload();
    }
  }

  private buildForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      siteId: ['', Validators.required]
    });
  }

  isValid(data : any) {
    console.log(data)
  }

  getSelected(siteId : any){
    if(siteId && localStorage.getItem("id_site")){

    console.log(siteId.toString() === localStorage.getItem("id_site"))
     return  siteId.toString() === localStorage.getItem("id_site");
    }
    return false
  }

  ngOnInit() {
    if(localStorage.getItem("id_site")){
      this.siteId = localStorage.getItem("id_site");
    }
    this.styles = this.dataCsService.getStyles('Component/Login');
    this.sites = this.dataCsService.getSite();
    this.customs = this.dataCsService.getCustoms('Component/Custom');
    console.log(this.styles)
  }
}
