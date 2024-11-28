import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-code-success',
  templateUrl: './code-success.component.html',
  styleUrls: ['./code-success.component.scss'],
})
export class CodeSuccessComponent {
  copied = false;

  constructor(
    public dialogRef: MatDialogRef<CodeSuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { code: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCopied() {
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 2000);
  }
}
