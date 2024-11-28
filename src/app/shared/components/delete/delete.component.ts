import { Component, Inject } from '@angular/core';
import { Student } from 'src/app/features/modules/instructor/modules/student/interfaces/student';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent {
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; message: string; _id: string },
    public dialogRef: MatDialogRef<DeleteComponent>
  ) {}

  students: Student[] = [];
  studentsWithoutGroup: Student[] = [];

  close(): void {
    this.dialog.closeAll();
  }

  onSubmit() {
    this.dialogRef.close({
      _id: this.data._id,
    });
  }
}
