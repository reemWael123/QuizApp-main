import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Result } from '../interfaces/result';
import { Observable } from 'rxjs';
import { ListColumn } from 'src/app/shared/interfaces/list-column';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  constructor(private httpClient: HttpClient) {}

  getResultList(): Observable<Result> {
    return this.httpClient.get<Result>('quiz/result');
  }

  get listColumns(): ListColumn[] {
    return [
      {
        type: 'text',
        header: 'Quiz Title',
        datafield: 'title',
      },
      {
        type: 'text',
        header: 'Questions Number',
        datafield: 'questions_number',
      },
      {
        type: 'text',
        header: 'Type',
        datafield: 'type',
      },
      {
        type: 'text',
        header: 'Difficulty',
        datafield: 'difficulty',
      },
      {
        type: 'date',
        header: 'Schedule',
        datafield: 'schadule',
      },
      {
        type: 'actions',
        header: 'Actions',
        datafield: 'actions',
        actions: {
          isView: true,
        },
      },
    ];
  }
}
