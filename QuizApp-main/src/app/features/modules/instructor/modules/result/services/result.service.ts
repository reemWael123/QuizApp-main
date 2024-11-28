import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from 'src/app/features/modules/student/modules/result/interfaces/result';
import { ListColumn } from 'src/app/shared/interfaces/list-column';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  private url = 'quiz';
  quizResult: Result;

  constructor(private http: HttpClient) {}

  getCompletedQuizzesResult(): Observable<Result[]> {
    return this.http.get<Result[]>(this.url + '/' + 'result');
  }

  get listColumns(): ListColumn[] {
    return [
      {
        type: 'text',
        header: ' Title',
        datafield: 'title',
      },
      {
        type: 'text',
        header: 'Group name',
        datafield: 'group',
      },
      {
        type: 'text',
        header: 'Category type',
        datafield: 'difficulty',
      },
      {
        type: 'length',
        header: 'Participants',
        datafield: 'participants',
      },
      {
        type: 'actions',
        header: 'Actions',
        datafield: 'actions',
        actions: {
          isView: true,
          isEdit: false,
          isDelete: false,
        },
      },
    ];
  }

  get quizResultColumns(): ListColumn[] {
    return [
      {
        type: 'text',
        header: 'Student name',
        datafield: 'student_name',
      },
      {
        type: 'text',
        header: 'Score',
        datafield: 'score',
      },
      {
        type: 'date',
        header: 'Time submitted',
        datafield: 'started_at',
      },
    ];
  }
}
