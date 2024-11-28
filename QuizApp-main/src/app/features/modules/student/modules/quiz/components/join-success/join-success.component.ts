import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JoinQuiz } from '../../interfaces/joinQuiz';
import { QuizService } from '../../services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-success',
  templateUrl: './join-success.component.html',
  styleUrls: ['./join-success.component.scss'],
})
export class JoinSuccessComponent {
  constructor(
    public dialogRef: MatDialogRef<JoinSuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public quizData: JoinQuiz,
    private quizService: QuizService,
    private router : Router
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  openQuiz() {
    this.onNoClick();
    this.quizService.getQuestions(this.quizData.data.quiz).subscribe({
      next: (res) => {
        this.router.navigate( ['/dashboard/student/quizzes/quiz'] );
        this.quizService.questions = res;
      },
    });
  }
}
