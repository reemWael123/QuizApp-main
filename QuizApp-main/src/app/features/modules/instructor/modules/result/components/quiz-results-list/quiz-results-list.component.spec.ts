import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizResultsListComponent } from './quiz-results-list.component';

describe('QuizResultsListComponent', () => {
  let component: QuizResultsListComponent;
  let fixture: ComponentFixture<QuizResultsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizResultsListComponent]
    });
    fixture = TestBed.createComponent(QuizResultsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
