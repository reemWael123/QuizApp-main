import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsComponent } from './questions.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { MaintainQuestionComponent } from './components/maintain-question/maintain-question.component';

@NgModule({
  declarations: [QuestionsComponent, MaintainQuestionComponent],
  imports: [CommonModule, QuestionsRoutingModule, SharedModule],
})
export class QuestionsModule {}
