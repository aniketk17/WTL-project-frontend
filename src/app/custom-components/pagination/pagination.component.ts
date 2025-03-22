// pagination.component.ts
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  standalone: false
})
export class PaginationComponent implements OnChanges {
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 6;
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  pages: number[] = [];
  totalPages: number = 0;
  pageSizeOptions: number[] = [6, 12, 18];

  ngOnChanges(changes: SimpleChanges): void {
    this.calculatePages();
  }

  calculatePages(): void {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    
    // Create array of page numbers, but limit display to avoid overcrowding
    let startPage = Math.max(1, this.currentPage - 2);
    let endPage = Math.min(this.totalPages, startPage + 4);
    
    // Adjust start if we're near the end
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }
    
    this.pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.pageChange.emit(page);
    }
  }

  getMinValue(a: number, b: number): number {
    return Math.min(a, b);
  }
  

  goToFirstPage(): void {
    this.goToPage(1);
  }

  
  goToLastPage(): void {
    this.goToPage(this.totalPages);
  }

  goToPreviousPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  goToNextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  changePageSize(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
      const newSize = +target.value;
      this.pageSize = newSize;
      this.pageSizeChange.emit(newSize);
      this.goToPage(1);
    }
  }
  


}