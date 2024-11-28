import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalActionHeaderComponent } from './modal-action-header.component';

describe('ModalActionHeaderComponent', () => {
  let component: ModalActionHeaderComponent;
  let fixture: ComponentFixture<ModalActionHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalActionHeaderComponent]
    });
    fixture = TestBed.createComponent(ModalActionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
