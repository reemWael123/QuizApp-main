import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz.component';
import { JoinQuizComponent } from './components/join-quiz/join-quiz.component';
import { QuizPageComponent } from './components/quiz-page/quiz-page.component';
import { JoinSuccessComponent } from './components/join-success/join-success.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CountdownComponent } from './components/countdown/countdown.component';
@NgModule({
  declarations: [
    QuizComponent,
    JoinQuizComponent,
    QuizPageComponent,
    JoinSuccessComponent,
    CountdownComponent,
  ],
  imports: [CommonModule, QuizRoutingModule, SharedModule],
})
export class QuizModule {}
