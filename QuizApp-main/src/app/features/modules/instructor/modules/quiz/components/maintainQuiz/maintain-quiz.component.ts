import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '../../../group/services/group.service';
import { Group } from '../../../group/interfaces/group';
import { MatDialog } from '@angular/material/dialog';
import { CodeSuccessComponent } from '../code-success/code-success.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quizDetails',
  templateUrl: './maintain-quiz.component.html',
  styleUrls: ['./maintain-quiz.component.scss'],
})
export class MaintainQuizComponent implements OnInit {
  quizForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    group: new FormControl('', [Validators.required]),
    duration: new FormControl(null, [Validators.required]),
    questions_number: new FormControl(null, [Validators.required]),
    score_per_question: new FormControl(null, [Validators.required]),
    schadule: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    difficulty: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
  });

  quizID: string = '';
  groups: Group[] = [];
  difficultyDropDown: string[] = ['hard', 'medium', 'easy'];
  typeDropDown: { value: string; label: string }[] = [
    {
      value: 'FE',
      label: 'Frontend',
    },
    {
      value: 'BE',
      label: 'Backend',
    },
  ];
  isViewMode = false;
  today = new Date().toISOString().slice(0, 16);

  constructor(
    private _QuizService: QuizService,
    private _groupService: GroupService,
    private _ActivatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private _toastr: ToastrService
  ) {
    this.quizID = this._ActivatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getAllGroups();
    if (this.quizID) {
      this.initQuizForm();
      this.checkRouting();
    }
  }

  checkRouting() {
    const currentRoute = this.router.url;
    if (currentRoute.includes('details')) {
      this.isViewMode = true;
      this.quizForm.disable();
    } else {
      this.isViewMode = false;
      this.quizForm.enable();
    }
  }

  getDetails(id: string) {
    this._QuizService.quizDetails(id).subscribe({
      next: (res: any) => {
        this.quizForm.patchValue(res);
        const schadule = new Date(res.schadule);
        this.quizForm.patchValue({
          schadule: schadule.toISOString().slice(0, 16),
        });
      },
    });
  }

  initQuizForm() {
    if (this.quizID) {
      this.getDetails(this.quizID);
    }
  }

  getAllGroups() {
    this._groupService.getAllGroups().subscribe({
      next: (res) => {
        this.groups = res;
      },
    });
  }

  editQuiz() {
    if (this.quizForm.valid) {
      this._QuizService.updateQuiz(this.quizID, this.quizForm).subscribe({
        next: () => {
          this._toastr.success('Quiz is updated successfully', 'Success');
        },
      });
    } else {
      this.quizForm.markAllAsTouched();
    }
  }

  addQuiz() {
    if (this.quizForm.valid) {
      this._QuizService.addQuiz(this.quizForm).subscribe({
        next: (res) => {
          if (res.message === 'Record created successfully') {
            this._toastr.success('Quiz is added successfully', 'Success');
            this.onClose();
            this.openCode(res.data.code);
          }
        },
      });
    } else {
      this.quizForm.markAllAsTouched();
    }
  }

  openCode(code: string) {
    const codeDialogRef = this.dialog.open(CodeSuccessComponent, {
      minWidth: '25%',
      data: { code: code },
    });
    codeDialogRef.afterClosed().subscribe((res) => {});
  }

  onClose(): void {
    this.dialog.closeAll();
  }
}
