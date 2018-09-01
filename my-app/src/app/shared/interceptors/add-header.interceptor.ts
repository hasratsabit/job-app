import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log(req.url);
    this.authService.loadToken();
    const jsonReq: HttpRequest<any> = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'authorization': this.authService.authToken
      }
    });
    return next.handle(jsonReq)
    .pipe(
      tap(event => {
        if(event instanceof HttpResponse){
          // console.log(event);
        }
      })
    )
  }
}