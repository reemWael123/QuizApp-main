import { Component } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ResultService } from '../../services/result.service';
import { ToastrService } from 'ngx-toastr';

import { ListColumn } from 'src/app/shared/interfaces/list-column';
import { Result } from '../../interfaces/result';

import { ViewResultComponent } from '../view-result/view-result.component';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss'],
})
export class ResultListComponent {
  resultDialogRef: MatDialogRef<ViewResultComponent>;

  resultList: Result[] = [];
  paginatedResultList: Result[] = [];

  columns: ListColumn[] = [];

  length!: number;
  pageSize = 10;
  pageIndex = 0;

  addDialogRef!: MatDialogRef<ViewResultComponent>;
  constructor(
    private resultService: ResultService,
    public dialog: MatDialog,
    private _toastr: ToastrService
  ) {
    this.columns = this.resultService.listColumns;
  }

  ngOnInit(): void {
    this.getResultList();
  }

  getResultList(): void {
    this.resultService.getResultList().subscribe({
      next: (data: any) => {
        this.length = data.length;
        this.resultList = data.map(({ quiz, result }: Result) => {
          return {
            ...quiz,
            ...result,
            title: quiz.title,
            questions_number: quiz.questions_number,
            type: quiz.type,
            difficulty: quiz.difficulty,
            schadule: quiz.schadule,
          };
        });
        this.updatePaginatedResults();
      },
    });
  }

  onPaginationAction(event: any): void {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    this.updatePaginatedResults();
  }

  updatePaginatedResults(): void {
    this.paginatedResultList = this.resultList.slice(
      this.pageIndex * this.pageSize,
      this.pageIndex * this.pageSize + this.pageSize
    );
  }

  onViewAction(result: any): void {
    this.dialog.open(ViewResultComponent, {
      minWidth: '50%',
      data: { ...result },
    });
  }
}
