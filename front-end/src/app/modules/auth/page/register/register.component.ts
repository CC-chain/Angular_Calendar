import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/service/auth.service';
import { CustomCs, DataCs } from '@app/data/schema/data';
import { default_login } from '@app/data/schema/defaultData';
import { DataCsService } from '@app/data/service/data-cs.service';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Input() _disable!: boolean;
  styles: Observable<DataCs[]> = of(default_login);
  customs!: Observable<CustomCs[]>
  customsStr = `\n  <app-custom [script]="context.script" [style]="context.style" [contextID]="context.id"> </app-custom> `
  registerForm: FormGroup = new FormGroup({
    email: new FormControl(""),
    phoneNumber: new FormControl(undefined),
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    password: new FormControl(""),
    gender: new FormControl(0),
  })

  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom, CountryISO.Turkey];

  constructor(private dataCsService: DataCsService, private formBuilder: FormBuilder, private router: Router,
    private authService: AuthService,) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.styles = this.dataCsService.getStyles('Component/Login');
    this.customs = this.dataCsService.getCustoms('Component/Custom');
  }

  get f() {
    return this.registerForm.controls;
  }

  register() {
     if (this.registerForm.invalid) {
      console.log(this.registerForm)
      return;
    }
    const credentials = this.registerForm.value;
    credentials.phoneNumber = this.f['phoneNumber'].value.number
    this.authService.register(credentials).subscribe(res => {
      if (res == true) {
          this.router.navigate(['/auth/login']);
      } else {
        window.location.reload();
      }
    })
  }

  private buildForm(): void {
    this.registerForm = this.formBuilder.group({
      email: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      firstName: ["",Validators.required],
      lastName: ["",Validators.required],
      gender: [0,Validators.required],
      password: ["",Validators.required]
    });
  }
}
