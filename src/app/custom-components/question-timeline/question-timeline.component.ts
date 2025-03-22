// question-timeline.component.ts
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-question-timeline',
  templateUrl: './question-timeline.component.html',
  styleUrls: ['./question-timeline.component.scss'],
  standalone: false
})
export class QuestionTimelineComponent implements OnInit, OnChanges {
  @Input() totalQuestions: number = 0;
  @Input() currentQuestion: number = 1;
  
  // Pagination properties
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalPages: number = 1;
  
  // Calculated display items
  displayItems: number[] = [];
  startIndex: number = 0;
  endIndex: number = 0;
  
  ngOnInit() {
    this.calculatePageInfo();
    this.updateDisplayItems();
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentQuestion'] || changes['totalQuestions']) {
      this.calculatePageInfo();
      this.updateDisplayItems();
    }
  }
  
  calculatePageInfo() {
    this.totalPages = Math.ceil(this.totalQuestions / this.itemsPerPage);
    // Ensure current question is visible by setting the proper page
    const questionPage = Math.ceil(this.currentQuestion / this.itemsPerPage);
    this.currentPage = questionPage;
  }
  
  updateDisplayItems() {
    this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.endIndex = Math.min(this.startIndex + this.itemsPerPage, this.totalQuestions);
    
    // Create array of indices to display
    this.displayItems = Array.from(
      { length: this.endIndex - this.startIndex }, 
      (_, i) => this.startIndex + i + 1
    );
  }
  
  getStepClasses(index: number): string {
    if (index < this.currentQuestion) {
      return 'bg-green-500 text-white'; // Completed
    } else if (index === this.currentQuestion) {
      return 'bg-blue-500 text-white'; // Current
    } else {
      return 'bg-white text-gray-700 border border-gray-300'; // Upcoming
    }
  }
  
  getConnectorClasses(index: number): string {
    if (index < this.currentQuestion) {
      return 'bg-green-500'; // Completed
    } else if (index === this.currentQuestion) {
      return 'bg-blue-500'; // Current
    } else {
      return 'bg-gray-200'; // Upcoming
    }
  }
  
  getConnectorWidth(index: number): number {
    if (index < this.currentQuestion) {
      return 100; // Completed - full width
    } else if (index === this.currentQuestion) {
      return 50; // Current - half width
    } else {
      return 0; // Upcoming - no width
    }
  }
  
  goToPrevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayItems();
    }
  }
  
  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayItems();
    }
  }
}