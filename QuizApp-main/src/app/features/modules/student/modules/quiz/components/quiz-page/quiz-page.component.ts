import { Component } from '@angular/core';
import { QuizService } from './../../services/quiz.service';
import { QuizResponse } from '../../interfaces/quizResponse';
import { Answer } from '../../interfaces/answer';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss'],
})
export class QuizPageComponent {
  questions: QuizResponse;
  answers: Answer[] = [];
  selectedAnswers: { [key: string]: string } = {};
  currentStep = 0;
  noOfQuestions = 0;

  constructor(
    private quizService: QuizService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.questions = this.quizService.questions;
    this.noOfQuestions = this.questions.data.questions.length;
  }

  chooseAnswer(questionId: string, selectedOption: string) {
    this.selectedAnswers[questionId] = selectedOption;

    const existingAnswer = this.answers.find(
      (answer) => answer.question === questionId
    );
    if (existingAnswer) {
      existingAnswer.answer = selectedOption;
    } else {
      this.answers.push({ question: questionId, answer: selectedOption });
    }
  }

  submitQuiz() {
    const answersData = {
      answers: this.answers,
    };
    this.quizService
      .submitQuiz(answersData, this.questions.data._id)
      .subscribe({
        next: () => {
          this.toastrService.success('Submitted quiz successfully', 'Success');
          this.router.navigate(['/dashboard/student/quizzes']);
        },
      });
  }

  resetAnswers() {
    this.answers = [];
    this.selectedAnswers = {};
  }

  navigateQuestion(index: number) {
    this.currentStep = index;
  }

  getStepStyle(index: number, question: any): string {
    const isAnswered = this.answers.some(
      (answer) => answer.question === question._id
    );

    // Current step
    if (index === this.currentStep) {
      return 'current-step';
    }

    // Previous step
    if (index < this.currentStep) {
      return isAnswered ? 'answered-step' : 'unanswered-previous-step';
    }

    // Next step
    if (index > this.currentStep) {
      return isAnswered ? 'answered-step' : 'next-step';
    }

    return 'next-step';
  }
}
