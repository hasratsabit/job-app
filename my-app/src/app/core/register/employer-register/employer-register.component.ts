import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControlName } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, Input } from '@angular/core';

import { Observable, Subscription, fromEvent, merge, of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { EmployerModel } from '../../../shared/models/employer.model';
import { GenericValidation } from '../../../shared/validations/generic-validation';
import { userValidationData } from '../../../shared/data/user-validation.data';

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

  public displayMessages: { [key: string ]: string } = {};
  private userValidationData: { [key: string]: { [key: string]: string } } = userValidationData;
  private genericValidation: GenericValidation;

  public employerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,

  ) {

    this.createRegistrationForm();
    this.genericValidation = new GenericValidation(this.userValidationData);
   }

  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];

  createRegistrationForm() {
    this.employerForm = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern(/^[a-zA-Z ]{2,30}$/)
      ])],
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        Validators.pattern(/^[a-zA-Z-0-9]{5,30}$/)
      ])],
      companyName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern(/^[a-zA-Z ]{2,30}$/)
      ])],
      companySize: ['', Validators.required],
      // serviceCategory: ['', Validators.required],
      emailGroup: this.formBuilder.group({
        email: ['', Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3,30}$/)
        ])],
        confirmEmail: ['', Validators.required],
      }),
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30)
      ])],
      confirmPassword: ['', Validators.required],
    });
  }

  onRegisterEmployer() {
    const employer: EmployerModel = this.employerForm.value;
    console.log(employer);
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const controlBlur: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(this.employerForm.valueChanges, ...controlBlur).pipe(
      debounceTime(500)
    ).subscribe(value => {
      this.displayMessages = this.genericValidation.processMessages(this.employerForm);
    })
  }

}
