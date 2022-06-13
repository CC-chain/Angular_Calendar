import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomMetaInterface, Employee } from '@app/data/schema/data';
import { TranslateService } from '@ngx-translate/core';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  modalData: Employee = {
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    password: "",
    gender: 0,
  };
  @Output() onChangeEvent = new EventEmitter<Employee>();

  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom, CountryISO.Turkey];

  form: FormGroup = new FormGroup({
    email: new FormControl(""),
    phoneNumber: new FormControl(undefined),
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    password: new FormControl(""),
    gender: new FormControl(0),
  });

  submitted = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      console.log(this.form)
      return;
    }
    console.log(this.modalData)
    this.modalData.phoneNumber = this.f["phoneNumber"].value.number
    this.modalData.gender = this.f["gender"].value
    this.modalData.email = this.f["email"].value
    this.onChangeEvent.emit(this.modalData)
  }

  constructor(private formBuilder: FormBuilder, private translateService: TranslateService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: ["", Validators.required],
        phoneNumber: [undefined, Validators.required],
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        password: ["", Validators.required],
        gender:[0, Validators.required, Validators.min(1)]
      }
    )
  }

  eventChange(event: any, prop: string) {
    switch (prop) {
      case 'firstName':
        this.modalData.firstName = event;
        break
      case 'lastName':
        this.modalData.lastName = event;
        break;
      case 'phoneNumber':
        this.modalData.phoneNumber = event
        break;
      case 'email':
        this.modalData.email = event
        break;
      case 'password':
        this.modalData.password = event
        break;
      case 'gender' :
        this.modalData.gender = event
    }
  }
}
