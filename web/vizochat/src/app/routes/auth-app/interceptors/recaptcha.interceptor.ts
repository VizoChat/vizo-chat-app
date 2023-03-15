import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Injectable()
export class RecaptchaInterceptor implements HttpInterceptor {

  constructor(private recaptchaV3Service: ReCaptchaV3Service) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.recaptchaV3Service.execute('importantAction')
    .pipe(
      switchMap((token) => {
        if (req.method === 'GET') {
          const params = req.params;
          const newParams = params.append('captchaToken', token);
          const authReq = req.clone({
            params: newParams
          });
          return next.handle(authReq);

        }else if (req.method === 'POST') {

          const bodyWithToken = { ...req.body, captchaToken: token };
          const authReq = req.clone({ body: bodyWithToken });
          console.log(`Token [${token}] generated`);
          return next.handle(authReq);
        }else{
          return next.handle(req);

        }
    }))
  }
}
