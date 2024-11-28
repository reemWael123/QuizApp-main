import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginResponse } from '../interfaces/login-response';
import { RegisterResponse } from '../interfaces/register-response';
import { IforgetPass, IresetPass } from '../interfaces/decode';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  role: any = '';
  url = 'auth/';

  constructor(private httpClient: HttpClient) {
    if (localStorage.getItem('userToken') !== null) {
      this.getUserData();
    }
  }

  onLogin(loginForm: FormGroup): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(
      this.url + 'Login',
      loginForm.value
    );
  }

  getUserData() {
    let encodeToken: any = localStorage.getItem('userToken');
    let decoded: any = jwtDecode(encodeToken);
    localStorage.setItem('email', decoded.email);
    localStorage.setItem('role', decoded.role);
    this.getRole();
  }

  getRole() {
    if (
      localStorage.getItem('userToken') !== null &&
      localStorage.getItem('role') !== null
    ) {
      this.role = localStorage.getItem('role');
    }
  }

  register(registerForm: FormGroup): Observable<RegisterResponse> {
    return this.httpClient.post<RegisterResponse>(
      this.url + 'register',
      registerForm.value
    );
  }

  onForgetPass(forgetPassForm: IforgetPass): Observable<any> {
    return this.httpClient.post(`${this.url}forgot-password`, forgetPassForm);
  }

  onResetPass(resetPassForm: IresetPass): Observable<any> {
    return this.httpClient.post(`${this.url}reset-password`, resetPassForm);
  }

  changePassword(changePasswordForm: FormGroup): Observable<any> {
    return this.httpClient.post(
      this.url + 'change-password',
      changePasswordForm.value
    );
  }

}
