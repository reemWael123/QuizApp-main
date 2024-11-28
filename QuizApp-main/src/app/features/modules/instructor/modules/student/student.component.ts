import { Component } from '@angular/core';
import { Student } from './interfaces/student';
import { StudentService } from './services/student.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';
import { ToastrService } from 'ngx-toastr';
import { GroupService } from './../group/services/group.service';
import { Group } from '../group/interfaces/group';
import { AddToGroupComponent } from './components/add-to-group/add-to-group.component';
import { UpdateComponent } from './components/update/update.component';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AddStudentComponent } from './components/add-student/add-student.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent {
  students: Student[] = [];
  studentsWithoutGroup: Student[] = [];
  groups: Group[] = [];
  studentFiltrationGroup: Student[] = [];
  paginatedStudents: Student[] = [];
  length = this.students.length;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  selectedGroupTabIndex = 0;

  constructor(
    private studentService: StudentService,
    private groupService: GroupService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private _Router: Router
  ) {}

  ngOnInit() {
    this.AllStudents();
    this.AllStudentsWithoutGroup();
    this.AllGroup();
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.paginatedStudents = this.students.slice(
      this.pageIndex * this.pageSize,
      this.pageIndex * this.pageSize + this.pageSize
    );
  }

  updatePagination() {
    this.length = this.students.length;
    this.paginatedStudents = this.students.slice(
      this.pageIndex * this.pageSize,
      this.pageIndex * this.pageSize + this.pageSize
    );
  }

  AllStudents() {
    this.studentService.getAllStudents().subscribe({
      next: (res) => {
        this.students = res;
        this.updatePagination();
      },
    });
  }

  AllStudentsWithoutGroup() {
    this.studentService.getAllStudentsWithoutGroup().subscribe({
      next: (res) => {
        this.studentsWithoutGroup = res;
      },
    });
  }

  AllGroup() {
    this.groupService.getAllGroups().subscribe({
      next: (res) => {
        this.groups = res;
      },
    });
  }

  getGroupByID(groupID: string) {
    this.groupService.getGroupById(groupID).subscribe({
      next: (res) => {
        this.studentFiltrationGroup = res.students;
      },
    });
  }

  viewStudent(student: Student) {
    console.log(student);
    this._Router.navigate([
      'dashboard/instructor/students/viewStudent',
      student._id,
    ]);
  }

  editStudent(student: Student, groupId?: string) {
    const addDialogRef = this.dialog.open(UpdateComponent, {
      minWidth: '50%',
      data: { student, groupId },
    });
    addDialogRef.afterClosed().subscribe((groupID) => {
      if (groupID) {
        this.studentService.updateStudentGroup(student._id, groupID).subscribe({
          next: () => {
            this.toastr.success(
              'Student group updated successfully',
              'Success'
            );
            this.getGroupByID(groupId!);
          },
        });
      }
    });
  }

  AddTOGroup(student: Student) {
    const addDialogRef = this.dialog.open(AddToGroupComponent, {
      minWidth: '50%',
    });
    addDialogRef.afterClosed().subscribe((groupID) => {
      if (groupID) {
        this.studentService.AddToGroup(student._id, groupID).subscribe({
          next: () => {
            this.toastr.success(
              'Student Added to group successfully',
              'Success'
            );
            this.AllStudentsWithoutGroup();
          },
        });
      }
    });
  }

  AddStudent() {
    const addDialogRef = this.dialog.open(AddStudentComponent, {
      minWidth: '50%',
      data: { students: this.studentsWithoutGroup, groups: this.groups },
    });
    addDialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.studentService
          .AddToGroup(data.selectStudentID, data.selectGroupID)
          .subscribe({
            next: () => {
              this.toastr.success(
                'Student Added to group successfully',
                'Success'
              );
              this.AllStudentsWithoutGroup();
            },
          });
      }
    });
  }

  deleteStudentDialog(student: Student, fromGroup?: boolean, groupID?: string) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '50%',
      data: {
        title: 'Delete Student',
        message: `Are you sure you want to delete student ${student.first_name}?`,
        _id: student._id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteStudent(result._id, groupID!, fromGroup!);
      } else {
        console.log('Delete canceled');
      }
    });
  }

  deleteStudent(id: string, groupId: string, fromGroup: boolean) {
    this.studentService.deleteStudent(id).subscribe({
      next: () => {
        this.toastr.success('Student deleted successfully', 'Success');
        if (fromGroup) {
          this.getGroupByID(groupId);
        }
        this.AllStudents();
      },
    });
  }

  resetGroupTabIndex() {
    this.selectedGroupTabIndex = 0;
  }

  onTabChange() {
    this.resetGroupTabIndex();
  }
}
