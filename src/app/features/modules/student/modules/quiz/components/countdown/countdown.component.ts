import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnDestroy {
  @Input() minutes: number = 0;
  seconds: number = 0;
  private countdownSubscription: Subscription | undefined;

  constructor(private router: Router) {}

  onInputChange() {
    this.stopCountdown();
    if (this.minutes > 0) {
      this.seconds = this.minutes * 60;
      this.startCountdown();
    } else {
      this.seconds = 0;
    }
  }

  startCountdown() {
    this.countdownSubscription = interval(1000).subscribe(() => {
      if (this.seconds > 0) {
        this.seconds--;
      } else {
        this.stopCountdown();
      }
    });
  }

  stopCountdown() {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
      this.router.navigate(['/dashboard/student/quizzes']);
    }
  }

  ngOnInit(): void {
    this.onInputChange();
  }

  ngOnDestroy(): void {
    this.stopCountdown();
  }

  get Math() {
    return window.Math;
  }
}
