import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from '../../interfaces/student';
import { Group } from '../../../group/interfaces/group';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent {
  selectGroupID: string = '';
  selectStudentID: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddStudentComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { students: Student[]; groups: Group[] }
  ) {}

  onSubmit() {
    const studentData = {
      selectGroupID: this.selectGroupID,
      selectStudentID: this.selectStudentID,
    };
    this.dialogRef.close(studentData);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
