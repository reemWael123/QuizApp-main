import { Component } from '@angular/core';
import { ResultService } from '../../services/result.service';
import { Result } from 'src/app/features/modules/student/modules/result/interfaces/result';
import { ListColumn } from 'src/app/shared/interfaces/list-column';

@Component({
  selector: 'app-quiz-results-list',
  templateUrl: './quiz-results-list.component.html',
  styleUrls: ['./quiz-results-list.component.scss'],
})
export class QuizResultsListComponent {
  quizResults: any;
  columns: ListColumn[] = [];
  ResultsList: Result[] = [];
  length!: number;
  pageSize = 10;
  groups: any;
  pageIndex = 0;
  paginatedResultList: any;

  constructor(private resultService: ResultService) {
    this.columns = this.resultService.quizResultColumns;
  }

  ngOnInit() {
    this.quizResults = this.resultService.quizResult;
    this.length = this.quizResults.participants.length;
    this.quizResults.participants.forEach((ele: any) => {
      const { first_name, last_name } = ele.participant;
      ele.student_name = first_name + ' ' + last_name;
    });
    this.updatePaginatedQuestions();
  }

  onPaginationAction(event: any): void {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    this.updatePaginatedQuestions();
  }

  updatePaginatedQuestions(): void {
    this.paginatedResultList = this.quizResults.participants.slice(
      this.pageIndex * this.pageSize,
      this.pageIndex * this.pageSize + this.pageSize
    );
  }
}
