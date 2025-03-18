import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-quiz',
  standalone: false,
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, OnDestroy {
  currentQuestionIndex: number = 0;
  timeLeft: number = 30;
  quizCompleted: boolean = false;
  score: number = 0;
  aiExplanation: string = '';
  timerInterval: any;
  userAnswers: string[] = [];

  questions: any[] = [
    {
      text: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: "Paris"
    },
    {
      text: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      correctAnswer: "Mars"
    },
  ];

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  startTimer() {
    this.clearTimer();
    this.timeLeft = 30;
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.handleTimeout();
      }
    }, 1000);
  }

  handleTimeout() {
    this.clearTimer();
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.nextQuestion();
    } else {
      this.submitQuiz();
    }
  }

  clearTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.startTimer();
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.startTimer();
    }
  }

  onAnswerSelected(answer: string) {
    this.userAnswers[this.currentQuestionIndex] = answer;
  }

  submitQuiz() {
    this.quizCompleted = true;
    this.clearTimer();
    this.score = this.questions.reduce((acc, question, index) => {
      return acc + (question.correctAnswer === this.userAnswers[index] ? 1 : 0);
    }, 0);
  }

  askAI() {
    this.aiExplanation = "Explanation for current question...";
  }

  retryQuiz() {
    this.quizCompleted = false;
    this.currentQuestionIndex = 0;
    this.userAnswers = [];
    this.score = 0;
    this.startTimer();
  }
}
