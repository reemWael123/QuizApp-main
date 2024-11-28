import { Component } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { ListColumn } from 'src/app/shared/interfaces/list-column';
import { Quiz } from '../../interfaces/quiz';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';
import { ReAssignQuizComponent } from '../re-assign-quiz/re-assign-quiz.component';

@Component({
  selector: 'app-all-quizzes',
  templateUrl: './all-quizzes.component.html',
  styleUrls: ['./all-quizzes.component.scss'],
})
export class AllQuizzesComponent {
  columns: ListColumn[] = [];
  quizList: Quiz[] = [];
  length!: number;
  pageSize = 10;
  pageIndex = 0;
  paginatedQuizList: any;

  constructor(
    private quizService: QuizService,
    private router: Router,
    private _toastr: ToastrService,
    public dialog: MatDialog
  ) {
    this.columns = this.quizService.listQuizzesColumns;
  }

  ngOnInit() {
    this.getAllQuizzes();
  }

  getAllQuizzes(): void {
    this.quizService.allQuizzes().subscribe({
      next: (res) => {
        this.length = res.length;
        this.quizList = res;
        this.updatePaginatedQuizzes();
      },
    });
  }

  onViewAction(quiz: Quiz): void {
    this.router.navigate(['/dashboard/instructor/quizzes/details', quiz._id]);
  }

  onAssignAction(id: string): void {
    const deleteDialogRef = this.dialog.open(ReAssignQuizComponent, {
      width: '50%',
      data: {id},
    } );
  }

  onDeleteAction(_id: string): void {
    const deleteDialogRef = this.dialog.open(DeleteComponent, {
      width: '50%',
      data: {
        title: 'Delete Question',
        message: `Are you sure you want to delete this question ?`,
        _id,
      },
    });

    deleteDialogRef.afterClosed().subscribe((result) => {
      if (result._id) {
        this.deleteQuestion(result._id);
      }
      console.log(result);
    });
  }

  deleteQuestion(_id: string): void {
    this.quizService.deleteQuiz(_id).subscribe({
      next: () => {
        this._toastr.success('Quiz is deleted successfully', 'Success');
        this.getAllQuizzes();
      },
    });
  }

  onPaginationAction(event: any): void {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    this.updatePaginatedQuizzes();
  }

  updatePaginatedQuizzes(): void {
    this.paginatedQuizList = this.quizList.slice(
      this.pageIndex * this.pageSize,
      this.pageIndex * this.pageSize + this.pageSize
    );
  }
}
