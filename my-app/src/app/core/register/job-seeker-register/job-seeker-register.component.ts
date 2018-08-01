import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControlName } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, Input } from '@angular/core';

import { Observable, Subscription, fromEvent, merge, of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { GenericValidation } from '../../../shared/validations/generic-validation';
import { userValidationData } from '../../../shared/data/user-validation.data';
import { ValueMatcherValidation } from '../../../shared/validations/value-match-validation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-seeker-register',
  templateUrl: './job-seeker-register.component.html',
  styleUrls: ['./job-seeker-register.component.scss']
})
export class JobSeekerRegisterComponent implements OnInit, AfterViewInit {

  public jobSeekerForm: FormGroup;
  public displayMessages: { [key: string ]: string } = {};
  private userValidationData: { [key: string]: { [key: string]: string } } = userValidationData;
  private genericValidation: GenericValidation;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createJobSeekerForm();
    this.genericValidation = new GenericValidation(this.userValidationData)
  }

  @ViewChildren(FormControlName, {read: ElementRef}) formInputElement: ElementRef[];
  createJobSeekerForm() {
    this.jobSeekerForm = this.formBuilder.group({
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

  cancelRegister() {
    this.router.navigate(['/home']);
  }
  ngOnInit() {
  }

  ngAfterViewInit() {
    const controlBlur: Observable<any>[] = this.formInputElement
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

      merge(this.jobSeekerForm.valueChanges, ...controlBlur).pipe(
        debounceTime(500)
      ).subscribe(value => {
        this.displayMessages = this.genericValidation.processMessages(this.jobSeekerForm)
      })
  }

}
