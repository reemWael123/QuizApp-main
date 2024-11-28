import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { QuizResponse } from '../interfaces/quizResponse';
import { JoinQuiz } from '../interfaces/joinQuiz';
import { ListColumn } from 'src/app/shared/interfaces/list-column';
import { ResponseSubmitQuiz } from '../interfaces/responseSubmitQuiz';
import { AnswerData } from '../interfaces/answer';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private url = 'quiz/';
  questions: QuizResponse;

  constructor(private httpClient: HttpClient) {}

  joinQuiz(code: string): Observable<JoinQuiz> {
    return this.httpClient.post<JoinQuiz>(this.url + 'join', { code: code });
  }

  getQuestions(quizID: string): Observable<QuizResponse> {
    return this.httpClient.get<QuizResponse>(
      this.url + 'without-answers/' + quizID
    );
  }

  submitQuiz(answers: AnswerData, quizID: string): Observable<ResponseSubmitQuiz> {
    return this.httpClient.post<ResponseSubmitQuiz>(
      this.url + 'submit/' + quizID,
      answers
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
}
