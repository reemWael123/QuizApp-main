import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    children: [
      { path: '', redirectTo: 'quizzes', pathMatch: 'full' },
      {
        path: 'quizzes',
        loadChildren: () =>
          import('./modules/quiz/quiz.module').then((m) => m.QuizModule),
      },
      {
        path: 'results',
        loadChildren: () =>
          import('./modules/result/result.module').then((m) => m.ResultModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
