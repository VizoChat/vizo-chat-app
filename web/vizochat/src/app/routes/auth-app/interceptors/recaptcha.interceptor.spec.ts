import { TestBed } from '@angular/core/testing';

import { RecaptchaInterceptor } from './recaptcha.interceptor';

describe('RecaptchaInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RecaptchaInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RecaptchaInterceptor = TestBed.inject(RecaptchaInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
