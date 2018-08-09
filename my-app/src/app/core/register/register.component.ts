import { AlertModel } from './../../shared/models/alert.model';
import { AuthService } from './../../shared/services/auth.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControlName } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, Input } from '@angular/core';

import { Observable, Subscription, fromEvent, merge, of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { User } from '../../shared/models/user.model';
import { GenericValidation } from '../../shared/validations/generic-validation';
import { userValidationData } from '../../shared/data/user-validation.data';
import { ValueMatcherValidation } from '../../shared/validations/value-match-validation';
import { Router } from '@angular/router';

// function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
//   const emailControl = c.get('email');
//   const confirmControl = c.get('confirmEmail');
//   if (emailControl.pristine || confirmControl.pristine) {
//     return null;
//   }
//   if (emailControl.value === confirmControl.value) {
//     return null;
//   }
//   return {'match': true };
// }

// function valueMatcher(baseValue: string, confirmValue: string): ValidatorFn {
//   return function(c: AbstractControl): { [key: string]: boolean } | null {
//     const baseValControl = c.get('email');
//     const confirmValControl = c.get('confirmEmail');
//     if (baseValControl.pristine || confirmValControl.pristine) {
//       return null;
//     }
//     if (baseValControl.value === confirmValControl.value) {
//       return null;
//     }
//     return {'match': true };
//   };
// }




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit, AfterViewInit {

  public displayMessages: { [key: string ]: string } = {};
  private userValidationData: { [key: string]: { [key: string]: string } } = userValidationData;
  private genericValidation: GenericValidation;
  public processing: boolean = false;
  public registerForm: FormGroup;
  public alertData: AlertModel = {alertClass: "", alertMessage: ""};
  public alertMessageIsShown: boolean = false;
  // public userCategories: string[] = ['jobseeker', 'employer', 'admin'];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router

  ) {

    this.createRegisterForm();
    this.genericValidation = new GenericValidation(this.userValidationData);
   }

  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
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
      location: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ])],
      userCategory: ['', Validators.required],
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

  onRegisterUser() {
    const user: User = this.registerForm.value;
    this.authService.registerUser(user).subscribe(res => {
      this.registerationCompleted(res);
    }, (err) => {
      console.log(err);
    })
  }


  registerationCompleted(res) {
    this.processing = true;
    this.registerForm.disable();
    this.showAlertMessage(res);
  }

  showAlertMessage(res) {
    this.alertMessageIsShown = true;
    if(res.success) {
      this.alertData.alertClass = "alert--success";
      this.alertData.alertMessage = res.message;
    } else {
      this.alertData.alertClass = "alert--error";
      this.alertData.alertMessage = res.message;
    }

    setTimeout(() => {
      if(res.success) {
        this.router.navigate(['/login']);
      }
      this.alertMessageIsShown = false;
    }, 3000);
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const controlBlur: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(this.registerForm.valueChanges, ...controlBlur).pipe(
      debounceTime(500)
    ).subscribe(value => {
      this.displayMessages = this.genericValidation.processMessages(this.registerForm);
    })
  }
}
