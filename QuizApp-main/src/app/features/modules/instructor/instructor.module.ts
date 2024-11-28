import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorRoutingModule } from './instructor-routing.module';
import { InstructorComponent } from './instructor.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashlistComponent } from './components/dashlist/dashlist.component';

@NgModule({
  declarations: [InstructorComponent, DashlistComponent],
  imports: [CommonModule, InstructorRoutingModule, SharedModule],
})
export class InstructorModule {}
