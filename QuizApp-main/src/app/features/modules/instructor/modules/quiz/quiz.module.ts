import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaintainQuizComponent } from './components/maintainQuiz/maintain-quiz.component';
import { CodeSuccessComponent } from './components/code-success/code-success.component';
import { AllQuizzesComponent } from './components/all-quizzes/all-quizzes.component';
import { ReAssignQuizComponent } from './components/re-assign-quiz/re-assign-quiz.component';

@NgModule({
  declarations: [QuizComponent, MaintainQuizComponent, CodeSuccessComponent, AllQuizzesComponent, ReAssignQuizComponent],
  imports: [CommonModule, QuizRoutingModule, SharedModule],
})
export class QuizModule {}
