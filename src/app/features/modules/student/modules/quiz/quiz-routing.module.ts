import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './quiz.component';
import { QuizPageComponent } from './components/quiz-page/quiz-page.component';
import { quizGuard } from 'src/app/core/guards/student/quiz.guard';

const routes: Routes = [
  {
    path: '',
    component: QuizComponent,
  },
  { path: 'quiz', component: QuizPageComponent, canActivate: [quizGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizRoutingModule {}
