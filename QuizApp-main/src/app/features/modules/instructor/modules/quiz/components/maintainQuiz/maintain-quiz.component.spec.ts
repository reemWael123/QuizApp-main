import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainQuizComponent } from './maintain-quiz.component';

describe('QuizDetailsComponent', () => {
  let component: MaintainQuizComponent;
  let fixture: ComponentFixture<MaintainQuizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaintainQuizComponent],
    });
    fixture = TestBed.createComponent(MaintainQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
