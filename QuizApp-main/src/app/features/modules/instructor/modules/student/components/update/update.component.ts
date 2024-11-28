import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupService } from '../../../group/services/group.service';
import { Group } from '../../../group/interfaces/group';
import { Student } from '../../interfaces/student';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent {
  selectValue: string = '';
  groups: Group[] = [];

  constructor(
    private _groupService: GroupService,
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { student: Student; groupId: string }
  ) {
    this.getAllGroups();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close(this.selectValue);
  }

  getAllGroups() {
    this._groupService.getAllGroups().subscribe({
      next: (res) => {
        this.groups = res;
        if (this.data.groupId == undefined) {
          this.selectValue = this.data.student.group._id;
        } else {
          this.selectValue = this.data.groupId;
          console.log(this.selectValue);
        }
      },
    });
  }
}
