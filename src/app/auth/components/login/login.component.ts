import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide: boolean = true;

  matcher = new ErrorStateMatcher();

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private _auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  submit() {
    if (this.loginForm.valid) {
      this._auth.onLogin(this.loginForm).subscribe({
        next: (res) => {
          localStorage.setItem('userToken', res.data.accessToken);
          this._auth.getUserData();
        },
        complete: () => {
          this.toastr.success( 'Login successfully', 'Success' );
          if ( this._auth.role === 'Student' ) {
            this.router.navigate(['/dashboard/student/quizzes']);
          }
          else {
            this.router.navigate(['/dashboard/instructor/dashboardList']);
          }
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
