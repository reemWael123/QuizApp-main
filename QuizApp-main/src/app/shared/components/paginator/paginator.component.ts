import { Component, EventEmitter, Input, Output } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  @Output() pageEvent = new EventEmitter();

  @Input() length: number = 0;
  @Input() pageSize: number = 10;
  @Input() pageIndex: number = 0;
  @Input() pageSizeOptions: number[] = [5, 10, 25];

  handlePageEvent(event: PageEvent): void {
    this.pageEvent.emit(event);
  }
}
