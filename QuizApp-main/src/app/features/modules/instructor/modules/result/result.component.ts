import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListColumn } from 'src/app/shared/interfaces/list-column';
import { Result } from '../../../student/modules/result/interfaces/result';
import { GroupService } from '../group/services/group.service';
import { ResultService } from './services/result.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent {
  constructor(
    private _ResultService: ResultService,
    private router: Router,
    private groupService: GroupService
  ) {
    this.columns = this._ResultService.listColumns;
  }

  ngOnInit(): void {
    this.getAllResults();
  }
  columns: ListColumn[] = [];
  ResultsList: Result[] = [];
  length!: number;
  pageSize = 10;
  groups: any;
  pageIndex = 0;
  paginatedResultList: any;

  onViewAction(result: Result): void {
    this._ResultService.quizResult = result;
    this.router.navigate(['/dashboard/instructor/results/quizResults']);
  }

  getAllResults(): void {
    this._ResultService.getCompletedQuizzesResult().subscribe({
      next: (res) => {
        this.length = res.length;
        this.groups = res;
        res.forEach((ele: any) => {
          const { title, group, difficulty } = ele.quiz;
          ele.title = title;
          ele.difficulty = difficulty;
          ele.group = group;
          this.getGroupById(ele.group).subscribe({
            next: (group) => {
              ele.group = group.name;
            },
          });
        });
        this.ResultsList = res;
        
        this.updatePaginatedQuestions();
      },
    });
  }

  getGroupById(groupID: string) {
    return this.groupService.getGroupById(groupID);
  }

  onPaginationAction(event: any): void {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    this.updatePaginatedQuestions();
  }

  updatePaginatedQuestions(): void {
    this.paginatedResultList = this.ResultsList.slice(
      this.pageIndex * this.pageSize,
      this.pageIndex * this.pageSize + this.pageSize
    );
  }
}
