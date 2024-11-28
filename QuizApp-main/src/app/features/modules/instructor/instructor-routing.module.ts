import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorComponent } from './instructor.component';
import { DashlistComponent } from './components/dashlist/dashlist.component';

const routes: Routes = [
  {
    path: '',
    component: InstructorComponent,
    children: [
      { path: '', redirectTo: 'dashboardList', pathMatch: 'full' },
      { path: 'dashboardList', component: DashlistComponent },
      {
        path: 'groups',
        loadChildren: () =>
          import('./modules/group/group.module').then((m) => m.GroupModule),
      },
      {
        path: 'students',
        loadChildren: () =>
          import('./modules/student/student.module').then(
            (m) => m.StudentModule
          ),
      },
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
      {
        path: 'questions',
        loadChildren: () =>
          import('./modules/questions/questions.module').then(
            (m) => m.QuestionsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorRoutingModule {}
