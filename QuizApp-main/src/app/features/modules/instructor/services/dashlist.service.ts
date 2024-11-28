import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from '../interfaces/quiz';

@Injectable({
  providedIn: 'root',
})
export class DashlistService {
  constructor(private _HttpClient: HttpClient) {}
  topstudents(): Observable<any> {
    return this._HttpClient.get('student/top-five');
  }

  topquiz(): Observable<Quiz[]> {
    return this._HttpClient.get<Quiz[]>('quiz/incomming');
  }

  topLastQuizzes(): Observable<Quiz[]> {
    return this._HttpClient.get<Quiz[]>('quiz/completed');
  }
}
