import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Group } from '../../../group/interfaces/group';
import { GroupService } from '../../../group/services/group.service';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-re-assign-quiz',
  templateUrl: './re-assign-quiz.component.html',
  styleUrls: ['./re-assign-quiz.component.scss'],
})
export class ReAssignQuizComponent {
  quizForm = new FormGroup({
    group: new FormControl('', [Validators.required]),
    duration: new FormControl(null, [Validators.required]),
    schadule: new FormControl('', [Validators.required]),
  });

  groups: Group[] = [];
  today = new Date().toISOString().slice(0, 16);

  constructor(
    private _quizService: QuizService,
    private _groupService: GroupService,
    private _toastr: ToastrService,
    public dialogRef: MatDialogRef<ReAssignQuizComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) {}

  ngOnInit(): void {
    this.getAllGroups();
  }

  getAllGroups() {
    this._groupService.getAllGroups().subscribe({
      next: (res) => {
        this.groups = res;
      },
    });
  }

  reassign() {
    this._quizService.reassignQuiz(this.data.id, this.quizForm).subscribe({
      next: (res) => {
        console.log(res);
        this._toastr.success('Quiz is reassigned successfully', 'Success');
      },
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
