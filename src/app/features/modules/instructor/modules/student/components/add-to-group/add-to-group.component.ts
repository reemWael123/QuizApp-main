import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupService } from '../../../group/services/group.service';
import { Group } from '../../../group/interfaces/group';

@Component({
  selector: 'app-add-to-group',
  templateUrl: './add-to-group.component.html',
  styleUrls: ['./add-to-group.component.scss'],
})
export class AddToGroupComponent {
  selectValue: string = '';
  selectStudent: string = '';
  groups: Group[] = [];

  constructor(
    private _groupService: GroupService,
    public dialogRef: MatDialogRef<AddToGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {}
  ) {
    this.getAllGroups();
  }

  onSubmit() {
    if (this.selectValue) this.dialogRef.close(this.selectValue);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  getAllGroups() {
    this._groupService.getAllGroups().subscribe({
      next: (res) => {
        this.groups = res;
      },
    });
  }
}
