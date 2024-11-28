import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { QuizService } from './../../services/quiz.service';
import { JoinSuccessComponent } from '../join-success/join-success.component';
import { ToastrService } from 'ngx-toastr';
import { JoinQuiz } from './../../interfaces/joinQuiz';

@Component({
  selector: 'app-join-quiz',
  templateUrl: './join-quiz.component.html',
  styleUrls: ['./join-quiz.component.scss'],
})
export class JoinQuizComponent {
  code: string = '';

  constructor(
    public dialogRef: MatDialogRef<JoinQuizComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {},
    private quizService: QuizService,
    public dialog: MatDialog,
    private toastrService: ToastrService
  ) {}

  joinQuiz() {
    if (this.code.length != 0) {
      this.onClose();
      this.quizService.joinQuiz(this.code).subscribe({
        next: (res) => {
          if (res.message === 'Student joined successfully') {
            this.toastrService.success(
              'Student joined successfully',
              'Success'
            );
            this.onClose();
            this.openJoinSuccess(res);
          }
        },
      });
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  openJoinSuccess(quizData: JoinQuiz) {
    const codeDialogRef = this.dialog.open(JoinSuccessComponent, {
      data: quizData,
      width: '25%',
    });
    codeDialogRef.afterClosed().subscribe(() => {});
  }
}
