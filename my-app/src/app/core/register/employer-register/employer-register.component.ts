import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControlName } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';

import { Observable, Subscription, fromEvent, merge, of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { EmployerModel } from '../../../shared/models/employer.model';
import { GenericValidation } from '../../../shared/validations/generic-validation';
import { validationMessages } from '../../data/validation.data';

function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get('email');
  const confirmControl = c.get('confirmEmail');
  if (emailControl.pristine || confirmControl.pristine) {
    return null;
  }
  if (emailControl.value === confirmControl.value) {
    return null;
  }
  return {'match': true };
}




@Component({
  selector: 'app-employer-register',
  templateUrl: './employer-register.component.html',
  styleUrls: ['./employer-register.component.scss']
})

export class EmployerRegisterComponent implements OnInit, AfterViewInit {

  public employerForm: FormGroup;
  public displayMessages: { [key: string ]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } } = validationMessages;
  private genericValidation: GenericValidation;

  constructor(
    private formBuilder: FormBuilder,

  ) {
    this.createEmployerRegisteration();


    this.genericValidation = new GenericValidation(this.validationMessages);
   }

  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];

  createEmployerRegisteration() {
    this.employerForm = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ])],
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30)
      ])],
      companyName: ['', Validators.required],
      companySize: ['', Validators.required],
      // serviceCategory: ['', Validators.required],
      emailGroup: this.formBuilder.group({
        email: ['', Validators.required],
        confirmEmail: ['', Validators.required],
      }, {validator: emailMatcher}),
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onRegisterEmployer() {
    const employer: EmployerModel = {
      name: this.employerForm.get('name').value,
      username: this.employerForm.get('username').value,
      companyName: this.employerForm.get('companyName').value,
      companySize: this.employerForm.get('companySize').value,
      // serviceCategory: this.employerForm.get('serviceCategory').value,
      email: this.employerForm.get('email').value,
      confirmEmail: this.employerForm.get('confirmEmail').value,
      password: this.employerForm.get('password').value,
      confirmPassword: this.employerForm.get('confirmPassword').value,
    };

    console.log(employer);
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const controlBlur: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(this.employerForm.valueChanges, ...controlBlur).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessages = this.genericValidation.processMessages(this.employerForm);
    })
  }

}
