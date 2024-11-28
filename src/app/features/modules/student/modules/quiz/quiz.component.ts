import { Component } from '@angular/core';
import { Quiz } from 'src/app/features/modules/instructor/interfaces/quiz';
import { DashlistService } from 'src/app/features/modules/instructor/services/dashlist.service';
import { ListColumn } from 'src/app/shared/interfaces/list-column';
import { JoinQuizComponent } from './components/join-quiz/join-quiz.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { QuizService } from './services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent {
  quizzes: Quiz[] = [];
  columns: ListColumn[] = [];
  completedQuizzes: Quiz[] = [];

  constructor(
    private _DashlistService: DashlistService,
    public dialog: MatDialog,
    private quizService: QuizService,
    private router: Router
  ) {
    this.columns = this.quizService.listColumns;
  }

  ngOnInit(): void {
    this.getComingQuiz();
    this.getCompletedQuiz();
  }

  getComingQuiz() {
    this._DashlistService.topquiz().subscribe({
      next: (res) => {
        this.quizzes = res;
      },
    });
  }

  getCompletedQuiz() {
    this._DashlistService.topLastQuizzes().subscribe({
      next: (res) => {
        this.completedQuizzes = res;
      },
    });
  }

  openQuiz(quizID?: string) {
    this.quizService.getQuestions(quizID!).subscribe({
      next: (res) => {
        this.router.navigate(['/dashboard/student/quizzes/quiz']);
        this.quizService.questions = res;
      },
      error: () => {
        this.openJoinQuiz();
      },
    });
  }

  openJoinQuiz() {
    const codeDialogRef = this.dialog.open(JoinQuizComponent, {
      width: '25%',
    });
    codeDialogRef.afterClosed().subscribe(() => {});
  }
}
