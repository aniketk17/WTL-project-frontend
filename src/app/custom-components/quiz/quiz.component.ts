import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-quiz',
  standalone: false,
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('tracker') tracker!: ElementRef;

  currentQuestionIndex: number = 0;
  timeLeft: number = 30;
  quizCompleted: boolean = false;
  score: number = 0;
  aiExplanation: string = '';
  timerInterval: any;
  userAnswers: string[] = [];
  attemptedQuestions: boolean[] = [];

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
    {
      text: "Who wrote 'Romeo and Juliet'?",
      options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
      correctAnswer: "William Shakespeare"
    },
    {
      text: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      correctAnswer: "Pacific Ocean"
    },
    {
      text: "What is the chemical symbol for gold?",
      options: ["Ag", "Au", "Fe", "Pt"],
      correctAnswer: "Au"
    },
    {
      text: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
      correctAnswer: "Leonardo da Vinci"
    },
    {
      text: "What is the capital of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
      correctAnswer: "Canberra"
    },
    {
      text: "Which gas do plants absorb during photosynthesis?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      correctAnswer: "Carbon Dioxide"
    },
    {
      text: "Who developed the theory of relativity?",
      options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"],
      correctAnswer: "Albert Einstein"
    },
    {
      text: "What is the largest mammal in the world?",
      options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
      correctAnswer: "Blue Whale"
    }
  ];

  ngOnInit() {
    this.startTimer();
    this.attemptedQuestions = new Array(this.questions.length).fill(false);
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  ngAfterViewInit() {
    this.scrollToCurrentQuestion();
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
      this.attemptedQuestions[this.currentQuestionIndex] = true;
      this.currentQuestionIndex++;
      this.startTimer();
      this.scrollToCurrentQuestion();
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.startTimer();
      this.scrollToCurrentQuestion();
    }
  }

  goToQuestion(index: number) {
    this.currentQuestionIndex = index;
    this.startTimer();
    this.scrollToCurrentQuestion();
  }

  onAnswerSelected(answer: string) {
    this.userAnswers[this.currentQuestionIndex] = answer;
  }

  isAttempted(index: number): boolean {
    return this.attemptedQuestions[index];
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
    this.attemptedQuestions = new Array(this.questions.length).fill(false);
    this.score = 0;
    this.startTimer();
    this.scrollToCurrentQuestion();
  }

  scrollToCurrentQuestion() {
    const trackerElement = this.tracker.nativeElement;
    const itemElement = trackerElement.querySelectorAll('.question-tracker-item')[this.currentQuestionIndex];
    if (itemElement) {
      itemElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}
