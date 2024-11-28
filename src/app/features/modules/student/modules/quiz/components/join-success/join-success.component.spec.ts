import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinSuccessComponent } from './join-success.component';

describe('JoinSuccessComponent', () => {
  let component: JoinSuccessComponent;
  let fixture: ComponentFixture<JoinSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JoinSuccessComponent]
    });
    fixture = TestBed.createComponent(JoinSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
