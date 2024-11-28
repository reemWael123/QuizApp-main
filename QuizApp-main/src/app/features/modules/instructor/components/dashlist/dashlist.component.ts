import { DashlistService } from 'src/app/features/modules/instructor/services/dashlist.service';
import { Component } from '@angular/core';
import { Quiz } from 'src/app/features/modules/instructor/interfaces/quiz';

@Component({
  selector: 'app-dashlist',
  templateUrl: './dashlist.component.html',
  styleUrls: ['./dashlist.component.scss'],
})
export class DashlistComponent {
  students: any;
  quizzes: Quiz[] = [];
  images: string[] = [
    '../../../../../assets/images/user img.svg',
    '../../../../../assets/images/user img.png',
    '../../../../../assets/images/2.svg',
    '../../../../../assets/images/4.png',
    '../../../../../assets/images/user img.svg',
  ];

  constructor(private _DashlistService: DashlistService) {}

  ngOnInit(): void {
    this.getStudentsTop();
    this.getComingQuiz();
  }

  getStudentsTop() {
    this._DashlistService.topstudents().subscribe({
      next: (res) => {
        this.students = res;
        console.log(res);
      },
    });
  }

  getComingQuiz() {
    this._DashlistService.topquiz().subscribe({
      next: (res) => {
        console.log(res);
        this.quizzes = res;
      },
    });
  }
}
