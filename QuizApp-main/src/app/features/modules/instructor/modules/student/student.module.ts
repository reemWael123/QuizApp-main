import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { UpdateComponent } from './components/update/update.component';
import { AddToGroupComponent } from './components/add-to-group/add-to-group.component';
import { ViewStudentComponent } from './components/view-student/view-student.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { RemoveGroupComponent } from './components/remove-group/remove-group.component';


@NgModule({
  declarations: [StudentComponent, AddToGroupComponent, UpdateComponent, ViewStudentComponent, AddStudentComponent, RemoveGroupComponent],
  imports: [CommonModule, StudentRoutingModule, SharedModule],
})
export class StudentModule {}
