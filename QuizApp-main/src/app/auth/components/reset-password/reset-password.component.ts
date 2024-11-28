import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlOptions } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {



  // decleration

  // -------------------

  constructor(

    private _AuthService: AuthService,
    private _Toastr: ToastrService,
    private _Router: Router,


  ) { }


  ngOnInit(): void {

  }


  // --------------------

  resetPassForm = new FormGroup({
    otp: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9@_]{3,20}$/)]),
    confirmPassword: new FormControl(null, Validators.required)

  }, { validators: [this.onConfirmPass] } as FormControlOptions)


  onConfirmPass(resetPassForm: FormGroup) {

    const password = resetPassForm.get('password')
    const confirmPassword = resetPassForm.get('confirmPassword')

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ notSame: true })
    }

  }



  resetPass(resetPassForm: FormGroup) {

    this._AuthService.onResetPass(resetPassForm.value).subscribe({
      next: (resp) => {
        this._Toastr.success('password has been reset successfully', 'success');
        this._Router.navigate(['/auth/login']);
      },
    })
  }



  get otp() {
    return this.resetPassForm.get('otp');
  }

  get email() {
    return this.resetPassForm.get('email');
  }

  get password() {
    return this.resetPassForm.get('password');
  }

  get confirmPass() {
    return this.resetPassForm.get('confirmPassword');
  }

}
