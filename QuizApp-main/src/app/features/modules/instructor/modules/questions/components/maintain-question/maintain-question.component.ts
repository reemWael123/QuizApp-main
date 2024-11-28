import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';
import { QuestionService } from '../../services/question.service';

import { AddEditQuestionRequest } from '../../interfaces/add-edit-question-request';

@Component({
  selector: 'app-maintain-question',
  templateUrl: './maintain-question.component.html',
  styleUrls: ['./maintain-question.component.scss'],
})
export class MaintainQuestionComponent {
  questionId: string = '';
  initialData: any;
  isView: boolean = false;

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

  difficultyDropDown: string[] = ['hard', 'medium', 'easy'];

  answerDropDown: string[] = ['A', 'B', 'C', 'D'];

  questionForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    optionA: new FormControl('', [Validators.required]),
    optionB: new FormControl('', [Validators.required]),
    optionC: new FormControl('', [Validators.required]),
    optionD: new FormControl('', [Validators.required]),
    answer: new FormControl('', [Validators.required]),
    difficulty: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<MaintainQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { question: any; isView: boolean },
    private _toastr: ToastrService,
    private _question: QuestionService
  ) {}

  ngOnInit(): void {
    this.isView = this.data?.isView;
    this.questionId = this.data?.question._id;

    if (this.questionId) {
      this.initQuestion();
    }
  }

  initQuestion(): void {
    if (this.isView) {
      this.questionForm.disable();
    }

    this.questionForm.patchValue({
      ...this.data.question,
      optionA: this.data.question.options.A,
      optionB: this.data.question.options.B,
      optionC: this.data.question.options.C,
      optionD: this.data.question.options.D,
    });
  }

  handleSubmit(): void {
    this.questionForm.markAllAsTouched();

    if (this.questionForm.valid) {
      const {
        title,
        description,
        optionA,
        optionB,
        optionC,
        optionD,
        answer,
        difficulty,
        type,
      } = this.questionForm.value;

      const questionRequestBody = {
        title,
        description,
        options: {
          A: optionA,
          B: optionB,
          C: optionC,
          D: optionD,
        },
        answer,
        difficulty,
        type,
      };

      if (this.questionId) {
        this.editQuestion(questionRequestBody as AddEditQuestionRequest);
      } else {
        this.addQuestion(questionRequestBody as AddEditQuestionRequest);
      }
    }
  }

  handleClose(): void {
    this.dialogRef.close();
  }

  addQuestion(questionRequestBody: AddEditQuestionRequest): void {
    this._question
      .addQuestion(questionRequestBody as AddEditQuestionRequest)
      .subscribe({
        next: () => {
          this._toastr.success('Question is added successfully', 'success');
          this.dialogRef.close();
        },
      });
  }

  editQuestion(questionRequestBody: AddEditQuestionRequest): void {
    this._question
      .editQuestion(
        questionRequestBody as AddEditQuestionRequest,
        this.questionId
      )
      .subscribe({
        next: () => {
          this._toastr.success('Question is updated successfully', 'success');
          this.dialogRef.close(this.data);
        },
      });
  }
}
