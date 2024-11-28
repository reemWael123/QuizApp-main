import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ListColumn } from '../../../../../../shared/interfaces/list-column';
import { AddEditQuestionRequest } from '../interfaces/add-edit-question-request';
import { MaintainQuestionResponse } from '../interfaces/maintain-question-response';
import { QuestionItem } from '../interfaces/question-item';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private url = 'question';

  constructor(private http: HttpClient) {}

  // Handle list columns
  get listColumns(): ListColumn[] {
    return [
      {
        type: 'text',
        header: 'Question Title',
        datafield: 'title',
      },
      {
        type: 'text',
        header: 'Question Desc',
        datafield: 'description',
      },
      {
        type: 'text',
        header: 'Question difficulty level',
        datafield: 'difficulty',
      },
      {
        type: 'text',
        header: 'Type',
        datafield: 'type',
      },
      {
        type: 'actions',
        header: 'Actions',
        datafield: 'actions',
        actions: {
          isView: true,
          isEdit: true,
          isDelete: true,
        },
      },
    ];
  }

  getAllQuestions(): Observable<QuestionItem[]> {
    return this.http.get<QuestionItem[]>(this.url);
  }

  addQuestion(
    formData: AddEditQuestionRequest
  ): Observable<MaintainQuestionResponse> {
    return this.http.post<MaintainQuestionResponse>(this.url, formData);
  }

  editQuestion(
    formData: AddEditQuestionRequest,
    questionId: string
  ): Observable<MaintainQuestionResponse> {
    return this.http.put<MaintainQuestionResponse>(
      this.url + '/' + questionId,
      formData
    );
  }

  deleteQuestion(questionId: string): Observable<MaintainQuestionResponse> {
    return this.http.delete<MaintainQuestionResponse>(
      this.url + '/' + questionId
    );
  }
}
