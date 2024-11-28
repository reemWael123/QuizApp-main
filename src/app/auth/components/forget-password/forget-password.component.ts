import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {
  // decleration

  // -------------------

  constructor(
    private _AuthService: AuthService,
    private _Toastr: ToastrService,
    private _Router: Router
  ) {}

  ngOnInit(): void {}

  // --------------------

  forgetPassForm = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
  });

  forgetPass(forgetPassForm: FormGroup) {
    this._AuthService.onForgetPass(forgetPassForm.value).subscribe({
      next: (resp) => {
        this._Toastr.success(
          'verification code has been sent to your email successfully',
          'success'
        );
        this._Router.navigate(['/auth/resetPassword']);
      },
    });
  }

  get email() {
    return this.forgetPassForm.get('email');
  }
}
