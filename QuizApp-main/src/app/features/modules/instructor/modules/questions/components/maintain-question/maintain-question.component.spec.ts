import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainQuestionComponent } from './maintain-question.component';

describe('MaintainQuestionComponent', () => {
  let component: MaintainQuestionComponent;
  let fixture: ComponentFixture<MaintainQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaintainQuestionComponent]
    });
    fixture = TestBed.createComponent(MaintainQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
