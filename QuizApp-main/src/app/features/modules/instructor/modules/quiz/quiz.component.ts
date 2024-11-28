import { Component } from '@angular/core';
import { DashlistService } from '../../services/dashlist.service';
import { Quiz } from '../../interfaces/quiz';
import { GroupService } from './../group/services/group.service';
import { ListColumn } from 'src/app/shared/interfaces/list-column';
import { QuizService } from './services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent {
  completedQuizzes: Quiz[] = [];
  IncomingQuizzes: Quiz[] = [];
  columns: ListColumn[] = [];

  constructor(
    private _DashlistService: DashlistService,
    private groupService: GroupService,
    private quizService: QuizService
  ) {
    this.columns = this.quizService.listColumns;
  }

  ngOnInit(): void {
    this.getCompletedQuiz();
    this.getComingQuiz();
  }

  getCompletedQuiz() {
    this._DashlistService.topLastQuizzes().subscribe({
      next: (res) => {
        res.forEach((ele) => {
          this.getGroupById(ele.group).subscribe((group) => {
            ele.group = group.name;
          });
        });
        this.completedQuizzes = res;
      },
    });
  }

  getComingQuiz() {
    this._DashlistService.topquiz().subscribe({
      next: (res) => {
        this.IncomingQuizzes = res;
      },
    });
  }

  getGroupById(groupID: any) {
    return this.groupService.getGroupById(groupID);
  }
}
