import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuizResultsListComponent } from './components/quiz-results-list/quiz-results-list.component';
import { ResultComponent } from './result.component';

const routes: Routes = [
  {
    path: '',
    component: ResultComponent,
  },
  {
    path: 'quizResults',
    component: QuizResultsListComponent,
    data: {
      breadcrumb: 'quiz results',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultRoutingModule {}
