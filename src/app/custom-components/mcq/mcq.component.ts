import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mcq',
  standalone: false,
  templateUrl: './mcq.component.html',
  styleUrls: ['./mcq.component.css']
})
export class McqComponent {
  @Input() currentQuestionIndex: number = 0;
  @Input() questions: any[] = [];
  @Output() answerSelected = new EventEmitter<string>();
  selectedAnswer: string | null = null;

  get currentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  onSelect(answer: string) {
    this.selectedAnswer = answer;
    this.answerSelected.emit(answer);
  }
}