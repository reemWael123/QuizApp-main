import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../interfaces/student';
import { MatDialog } from '@angular/material/dialog';
import { RemoveGroupComponent } from '../remove-group/remove-group.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss']
})
export class ViewStudentComponent{

  StudentId: string = "";
  studentDetails:Student;

  constructor( private _ActivatedRoute: ActivatedRoute ,
    private _studentService: StudentService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private _Router: Router
  ){
  
  }
  ngOnInit() {
    this.StudentId = this._ActivatedRoute.snapshot.params['id'];
    this.viewStudent(this.StudentId)
  }

  viewStudent(id: string) {

    this._studentService.getStudentById(id).subscribe({

      next: (resp) => {

        console.log(resp);

        this.studentDetails = resp;

        console.log(this.studentDetails);


      },
      error: (err) => {

      }
    })
  }

  removeStudentDialog() {
    const dialogRef = this.dialog.open(RemoveGroupComponent, {
      minWidth: '50%',
      data: {
        title: 'Remove Student',
        message: `Are you sure you want to Remove student ${this.studentDetails.first_name}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.removeStudent();
        this._Router.navigate([
          'dashboard/instructor/students',
        ]);
      } else {
        console.log('Remove canceled');
      }
    });
  }

  removeStudent() {
    this._studentService.removeStudentGroup(this.studentDetails._id,this.studentDetails.group._id).subscribe({
      next: () => {
        this.toastr.success('Student Removed successfully', 'Success');
      },
    });
  }


}
