import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControlName } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, Input } from '@angular/core';

import { Observable, Subscription, fromEvent, merge, of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Employer } from '../../../shared/models/employer.model';
import { GenericValidation } from '../../../shared/validations/generic-validation';
import { userValidationData } from '../../../shared/data/user-validation.data';
import { ValueMatcherValidation } from '../../../shared/validations/value-match-validation';
import { RegisterService } from '../../services/register.service';

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

function valueMatcher(baseValue: string, confirmValue: string): ValidatorFn {
  return function(c: AbstractControl): { [key: string]: boolean } | null {
    const baseValControl = c.get('email');
    const confirmValControl = c.get('confirmEmail');
    if (baseValControl.pristine || confirmValControl.pristine) {
      return null;
    }
    if (baseValControl.value === confirmValControl.value) {
      return null;
    }
    return {'match': true };
  };
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
    private registerService: RegisterService

  ) {

    this.createEmployerForm();
    this.genericValidation = new GenericValidation(this.userValidationData);
   }

  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];

  createEmployerForm() {
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
      }, {validator: ValueMatcherValidation.matchValue('email', 'confirmEmail')}),
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30)
      ])],
      confirmPassword: ['', Validators.required],
    });
  }

  onRegisterEmployer() {
    const employer: Employer = this.employerForm.value;
    this.registerService.registerEmployer(employer).subscribe(res => {
      console.log(res);
    })
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
