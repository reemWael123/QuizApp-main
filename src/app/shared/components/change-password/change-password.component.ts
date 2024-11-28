import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  changePasswordForm = new FormGroup({
    password: new FormControl('', Validators.required),
    password_new: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public dialogRef: MatDialogRef<ChangePasswordComponent>
  ) {}

  changePassword() {
    if (this.changePasswordForm.valid) {
      this.authService.changePassword(this.changePasswordForm).subscribe({
        next: () => {
          this.toastrService.success(
            'Password changed successfully!',
            'Success'
          );
          this.onClose();
        },
      });
    } else {
      this.changePasswordForm.markAllAsTouched();
    }
  }

  onSubmit() {
    this.changePassword();
  }

  onClose() {
    this.dialogRef.close();
  }
}
