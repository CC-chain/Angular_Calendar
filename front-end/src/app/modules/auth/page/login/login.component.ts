import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, SimpleChanges, ChangeDetectorRef, Renderer2, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { tap, delay, finalize, catchError, filter, timeout } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, Subject, Subscription } from 'rxjs';

import { AuthService } from '@core/service/auth.service';
import { DataCsService } from '@app/data/service/data-cs.service';
import { CustomCs, DataCs } from '@app/data/schema/data';
import { DOCUMENT } from '@angular/common';
import { DynamicImportService } from '@app/shared/service/dynamic_import/dynamic-import.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  @Input() _disable!: boolean;
  styles!: Observable<DataCs[]>;
  customs : CustomCs[] = [];
  error!: string;
  isLoading!: boolean;
  loginForm!: FormGroup;

  private sub = new Subscription();

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

    this.sub = this.authService
      .login(credentials)
      .pipe(
        delay(1500),
        tap(() => this.router.navigate(['/home/calendar'])),
        finalize(() => (this.isLoading = false)),
        catchError(error => of((this.error = error)))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private buildForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  getCustoms() {
    new Promise<void>((resolve, reject) => {
      this.dataCsService.getCustoms('custom/').subscribe({
        next: (res: any) => {
          let sources : CustomCs[] = [];
          res.map((res : any) => {
            if(res.targetComponent === "LoginComponent")
            sources.push (new CustomCs(res.id,res.name,res.layout,res.content,res.script,res.targetComponent,res.dependentComponents));
          })
          console.log(sources);
          this.customs = sources;
          resolve();
        },
        error: (err: any) => {
          reject(err);
        },
        complete: () => {
          console.log("complete");
        }
      },

      )
    });

  }

  ngOnInit() {
    this.styles = this.dataCsService.getStyles('login/');
    this.getCustoms();
  }
}
