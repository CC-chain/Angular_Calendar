import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CalendarConfig, IData, SiteService, User } from '@app/data/schema/data';
import { DataCsService } from '@app/data/service/data-cs.service';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
@Component({
  selector: 'dynamic-profile',
  templateUrl: './dynamic-profile.component.html',
  styleUrls: ['./dynamic-profile.component.scss']
})
export class DynamicProfileComponent implements OnInit {
  @Input() user!: User;
  oldPassword$ : string = ""
  newPassword$ : string = ""

  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom, CountryISO.Turkey];

  form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    gender: new FormControl(0),
    phoneNumber: new FormControl(''),
    email: new FormControl(false),
    newPassword: new FormControl(''),
    oldPassword: new FormControl(''),
  })
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getUser() : User{
    let newUser  : User = {
      id : this.user.id,
      firstName: this.f['firstName'].value,
      lastName: this.f['lastName'].value,
      gender: this.f['gender'].value,
      phoneNumber: this.f['phoneNumber'].value,
    }
    return newUser;
  }

  constructor(private formBuilder: FormBuilder, private dataService : DataCsService) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      gender: ['',Validators.required],
      phoneNumber: ['',Validators.required],
      email: ['',Validators.required],
      oldPassword: [''],
      newPassword: [''],
    },{validators : this.isTypedOldPassword('oldPassword','newPassword')})
  }

  isTypedOldPassword(oldPassword : string , newPassword : string){
      return (formGroup: FormGroup) => {
      const control = this.f[oldPassword];
      const matchingControl =this.f[newPassword];
      if (control.value == "" ) {
        matchingControl.setErrors({ required : true });
        control.setErrors({ required : true})
      } else {
        matchingControl.setErrors(null);
      }
      return null;
    };
  }



  submitted = false;
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      console.log(this.form)
      return;
    }
    if(this.newPassword$ != "" && this.oldPassword$ != "" && this.user.id){
      this.dataService.editPassword({id : this.user.id,newPassword : this.newPassword$,oldPassword : this.oldPassword$} , "Account/ChangePassword")
      .subscribe((data : any) => {
        if(data.success && this.f['email'].value){
          this.dataService.editEmail({id : this.user.id! , email : this.f['email'].value},"Account/ChangeEmail")
          .subscribe((data : any) => {
            if(data.success){
              this.dataService.editUser(this.getUser(),"User/Update")
              .subscribe(data => console.log(data));
            }
          })
        }
      })
    }

     if(this.user.id && this.f['email'].value){
          this.dataService.editEmail({id : this.user.id , email : this.f['email'].value},"Account/ChangeEmail")
          .subscribe((data : any) => {
            if(data.success){
              this.dataService.editUser(this.getUser(),"User/Update")
              .subscribe(data => console.log(data));
            }
          })
        }

  }
}
