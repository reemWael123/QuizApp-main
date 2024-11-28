import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz, QuizResponse } from '../interfaces/quiz';
import { FormGroup } from '@angular/forms';
import { ListColumn } from 'src/app/shared/interfaces/list-column';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private _HttpClient: HttpClient) {}

  addQuiz(quizForm: FormGroup): Observable<QuizResponse> {
    return this._HttpClient.post<QuizResponse>(`quiz`, quizForm.value);
  }

  updateQuiz(quizID: string, quizForm: FormGroup) {
    return this._HttpClient.put(`quiz/${quizID}`, quizForm.value);
  }

  quizDetails(quizID: string): Observable<Quiz> {
    return this._HttpClient.get<Quiz>(`quiz/${quizID}`);
  }

  allQuizzes(): Observable<Quiz[]> {
    return this._HttpClient.get<Quiz[]>(`quiz`);
  }

  deleteQuiz(quizID: string): Observable<any> {
    return this._HttpClient.delete<Quiz[]>(`quiz/${quizID}`);
  }

  reassignQuiz(quizID: string, reassignData: FormGroup): Observable<any> {
    return this._HttpClient.post<Quiz[]>(
      `quiz/reassign/${quizID}`,
      reassignData.value
    );
  }

  get listColumns(): ListColumn[] {
    return [
      {
        type: 'text',
        header: 'Title',
        datafield: 'title',
      },
      {
        type: 'text',
        header: 'Group Name',
        datafield: 'group',
      },
      {
        type: 'date',
        header: 'Date',
        datafield: 'schadule',
      },
      {
        type: 'text',
        header: 'No. of students',
        datafield: 'participants',
      },
    ];
  }

  get listQuizzesColumns(): ListColumn[] {
    return [
      {
        type: 'text',
        header: 'Title',
        datafield: 'title',
      },
      {
        type: 'text',
        header: 'Code',
        datafield: 'code',
      },
      {
        type: 'text',
        header: 'Status',
        datafield: 'status',
      },
      {
        type: 'text',
        header: 'Duration',
        datafield: 'duration',
      },
      {
        type: 'text',
        header: 'Type',
        datafield: 'type',
      },
      {
        type: 'date',
        header: 'Date',
        datafield: 'schadule',
      },
      {
        type: 'actions',
        header: 'Actions',
        datafield: 'actions',
        actions: {
          isView: true,
          isEdit: false,
          isDelete: true,
          isReAssign: true,
        },
      },
    ];
  }
}
