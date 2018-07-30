import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';




function valueMatcher(firstValue, secondValue) {
  return (control: AbstractControl): { [key: string]: boolean} | null => {
    let emailControl = control.get(firstValue);
    let confirmEmailControl = control.get(secondValue);
  
    if(emailControl.pristine || confirmEmailControl.pristine) {
      return null;
    }
  
    if(emailControl.value === confirmEmailControl.value) {
      return null;
    }
    return { 'match': true }
  }
}


@Component({
  selector: 'app-employer-register',
  templateUrl: './employer-register.component.html',
  styleUrls: ['./employer-register.component.scss']
})

export class EmployerRegisterComponent implements OnInit {

  public employerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,

  ) {
    this.createEmployerRegisteration();
   }


  createEmployerRegisteration(): void {
    this.employerForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      companyName: ['', Validators.required],
      companySize: ['', Validators.required],
      // serviceCategory: ['', Validators.required],
      emailGroup: this.formBuilder.group({
        email: ['', Validators.required],
        confirmEmail: ['', Validators.required],
      }, {validator: valueMatcher('email', 'confirmEmail')}),
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    })
  }

  onRegisterEmployer() {
    const employer = {
      name: this.employerForm.get('name'),
      username: this.employerForm.get('username'),
      companyName: this.employerForm.get('companyName'),
      companySize: this.employerForm.get('companySize'),
      // serviceCategory: this.employerForm.get('serviceCategory'),
      email: this.employerForm.get('email'),
      confirmEmail: this.employerForm.get('confirmEmail'),
      password: this.employerForm.get('password'),
      confirmPassword: this.employerForm.get('confirmPassword'),
    }

    console.log(employer);
  }

  ngOnInit() {
  }

}
