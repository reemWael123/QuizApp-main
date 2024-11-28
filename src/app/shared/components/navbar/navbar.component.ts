import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MaintainQuizComponent } from 'src/app/features/modules/instructor/modules/quiz/components/maintainQuiz/maintain-quiz.component';
import { JoinQuizComponent } from 'src/app/features/modules/student/modules/quiz/components/join-quiz/join-quiz.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  role: any = '';
  email: any = '';

  constructor(private router: Router, public dialog: MatDialog) {
    this.role = localStorage.getItem('role');
    this.email = localStorage.getItem('email');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth']);
  }

  addQuiz() {
    const addDialogRef = this.dialog.open(MaintainQuizComponent, {
      minWidth: '50%',
    });
    addDialogRef.afterClosed().subscribe(() => {});
  }

  joinQuiz() {
    const joinDialogRef = this.dialog.open(JoinQuizComponent, {
      width: '25%',
    });
    joinDialogRef.afterClosed().subscribe(() => {});
  }

  changePassword(): void {
    const deleteDialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '50%',
    });
  }
}
