import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-action-header',
  templateUrl: './modal-action-header.component.html',
  styleUrls: ['./modal-action-header.component.scss'],
})
export class ModalActionHeaderComponent {
  @Output() onSubmit = new EventEmitter();
  @Output() onClose = new EventEmitter();

  @Input() title: string = '';
  @Input() isSubmit: boolean = true;
  @Input() isClose: boolean = true;

  submit(): void {
    this.onSubmit.emit();
  }

  close(): void {
    this.onClose.emit();
  }
}
