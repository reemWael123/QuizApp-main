import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.scss'],
})
export class ViewResultComponent {
  userName: string = '';
  percentage: number | undefined = undefined;

  constructor(
    public dialogRef: MatDialogRef<ViewResultComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    const { participant, score, questions_number, score_per_question } =
      this.data;

    this.userName = participant.first_name + ' ' + participant.last_name;
    this.percentage = (score / (questions_number * score_per_question)) * 100;
  }

  close(): void {
    this.dialogRef.close();
  }
}
