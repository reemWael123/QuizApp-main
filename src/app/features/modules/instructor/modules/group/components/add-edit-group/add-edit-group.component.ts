import { Component, Inject } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { GroupService } from '../../services/group.service';
import { ToastrService } from 'ngx-toastr';

import { GroupStudent } from '../../interfaces/group-student';
import { AddEditGroupRequest } from '../../interfaces/add-edit-group-request';
import { Group } from '../../interfaces/group';

@Component({
  selector: 'app-add-edit-group',
  templateUrl: './add-edit-group.component.html',
  styleUrls: ['./add-edit-group.component.scss'],
})
export class AddEditGroupComponent {
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

  handleSubmit(): void {
    this.groupForm.markAllAsTouched();

    if (this.groupForm.valid) {
      if (this.groupId) {
        this.editGroup();
      } else {
        this.addGroup();
      }
    }
  }

  handleClose(): void {
    this.dialogRef.close();
  }

  addGroup(): void {
    this._group
      .addGroup(this.groupForm.value as AddEditGroupRequest)
      .subscribe({
        next: () => {
          this._toastr.success('Group is added successfully', 'success');
          this.dialogRef.close();
        },
      });
  }

  editGroup(): void {
    this._group
      .editGroup(this.groupId, this.groupForm.value as AddEditGroupRequest)
      .subscribe({
        next: () => {
          this._toastr.success('Group is updated successfully', 'success');
          this.dialogRef.close();
        },
      });
  }
}
