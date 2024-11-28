import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../interfaces/student';

@Component({
  selector: 'app-remove-group',
  templateUrl: './remove-group.component.html',
  styleUrls: ['./remove-group.component.scss']
})
export class RemoveGroupComponent {
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; message: string;},
    public dialogRef: MatDialogRef<RemoveGroupComponent>
  ) {}

  // students: Student[] = [];
  // studentsWithoutGroup: Student[] = [];

  close(): void {
    this.dialog.closeAll();
  }
  onSubmit() {
    this.dialogRef.close(true);
  }
}