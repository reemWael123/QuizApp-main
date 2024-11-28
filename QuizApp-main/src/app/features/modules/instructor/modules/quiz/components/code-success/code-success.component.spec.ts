import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeSuccessComponent } from './code-success.component';

describe('CodeSuccessComponent', () => {
  let component: CodeSuccessComponent;
  let fixture: ComponentFixture<CodeSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodeSuccessComponent]
    });
    fixture = TestBed.createComponent(CodeSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
