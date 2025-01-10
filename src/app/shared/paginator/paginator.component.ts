import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-paginator',
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSlideToggleModule,
    MatPaginatorModule,
  ],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {
    @Input() length = 0;
    pageSize = 0;
    pageIndex = 0;
    pageSizeOptions = [4, 8, 15];

    @Output() pageChange = new EventEmitter<{ pageSize: number; pageIndex: number }>();

    showPageSizeOptions = true;

    pageEvent!: PageEvent;

    handlePageEvent(e: PageEvent) {
      this.pageChange.emit({ pageSize: e.pageSize, pageIndex: e.pageIndex });
    }

    setPageSizeOptions(setPageSizeOptionsInput: string) {
      if (setPageSizeOptionsInput) {
        this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
      }
    }

}
