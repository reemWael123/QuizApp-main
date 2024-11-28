import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultRoutingModule } from './result-routing.module';
import { ResultComponent } from './result.component';
import { QuizResultsListComponent } from './components/quiz-results-list/quiz-results-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ResultComponent, QuizResultsListComponent],
  imports: [CommonModule, ResultRoutingModule, SharedModule],
})
export class ResultModule {}
