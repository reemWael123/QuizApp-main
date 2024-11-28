import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResultRoutingModule } from './result-routing.module';

import { ResultComponent } from './result.component';
import { ResultListComponent } from './components/result-list/result-list.component';
import { ViewResultComponent } from './components/view-result/view-result.component';

@NgModule({
  declarations: [ResultComponent, ResultListComponent, ViewResultComponent],
  imports: [CommonModule, ResultRoutingModule, SharedModule],
})
export class ResultModule {}
