import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveGroupComponent } from './remove-group.component';

describe('RemoveGroupComponent', () => {
  let component: RemoveGroupComponent;
  let fixture: ComponentFixture<RemoveGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveGroupComponent]
    });
    fixture = TestBed.createComponent(RemoveGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
