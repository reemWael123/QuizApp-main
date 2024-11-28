import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReAssignQuizComponent } from './re-assign-quiz.component';

describe('ReAssignQuizComponent', () => {
  let component: ReAssignQuizComponent;
  let fixture: ComponentFixture<ReAssignQuizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReAssignQuizComponent]
    });
    fixture = TestBed.createComponent(ReAssignQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
