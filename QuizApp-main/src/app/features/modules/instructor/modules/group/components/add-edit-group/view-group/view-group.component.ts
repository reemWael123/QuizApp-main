import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AddEditGroupRequest } from '../../../interfaces/add-edit-group-request';
import { GroupStudent } from '../../../interfaces/group-student';
import { GroupService } from '../../../services/group.service';
import { AddEditGroupComponent } from '../add-edit-group.component';

@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrls: ['./view-group.component.scss'],
})
export class ViewGroupComponent {
  groupId: string = '';
  initialData: any;

  studentsDropDown: GroupStudent[] = [];

  groupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    students: new FormControl([], [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<AddEditGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private _group: GroupService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.groupId = this.data?.id;

    if (this.groupId) {
      this.getGroupById();
    } else {
      this.getStudentsDropDown();
    }
  }

  getGroupById(): void {
    this._group.getGroupById(this.groupId).subscribe({
      next: (response) => {
        this.initialData = response;
        this.getStudentsDropDown();
      },
    });
  }

  getStudentsDropDown(): void {
    this._group.getStudentsWithoutGroups().subscribe({
      next: (data) => {
        this.studentsDropDown = data;
        this.groupForm.disable();
        if (this.groupId) {
          this.studentsDropDown = [
            ...this.studentsDropDown,
            ...this.initialData.students,
          ];

          this.initGroup();
        }
      },
    });
  }

  initGroup(): void {
    this.groupForm.patchValue({
      name: this.initialData.name,
      students: this.initialData.students.map((student: any) => student._id),
    });
  }

  handleClose(): void {
    this.dialogRef.close();
  }

  viewGroup(): void {
    this._group
      .addGroup(this.groupForm.value as AddEditGroupRequest)
      .subscribe({
        next: () => {
          this.dialogRef.close();
          this.groupForm.disabled;
        },
      });
  }
}
