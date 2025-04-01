import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-quiz',
  standalone: false,
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('tracker') tracker!: ElementRef;
  quizId: number = 1;

  currentQuestionIndex: number = 0;
  quizCompleted: boolean = false;
  quizStarted: boolean = false;
  score: number = 0;
  aiExplanation: string = '';
  timerInterval: any;
  userAnswers: any = [];
  attemptedQuestions: boolean[] = [];
  reviewAnswer: boolean = false;
  selectedAnswer: any = [];
  results: any[] = [
    {
      "question": {
        "text": "What is the capital of France?",
        "options": ["London", "Berlin", "Paris", "Madrid"],
        "correctAnswer": "Paris"
      },
      "selected_option": "Paris",
      "correct_option": "Paris",
      "is_correct": true
    },
    {
      "question": {
        "text": "Which planet is known as the Red Planet?",
        "options": ["Earth", "Mars", "Jupiter", "Venus"],
        "correctAnswer": "Mars"
      },
      "selected_option": "Jupiter",
      "correct_option": "Mars",
      "is_correct": false
    }
  ]
    ;

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
      text: "To make the timer component fixed even after scrolling, you need to modify its CSS by changing position: sticky to position: fixed and specifying top and right values to keep it anchored in place.To make the timer component fixed even after scrolling, you need to modify its CSS by changing position: sticky to position: fixed and specifying top and right values to keep it anchored in place.",
      options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"],
      correctAnswer: "Albert Einstein"
    },
    {
      text: "What is the largest mammal in the world?",
      options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
      correctAnswer: "Blue Whale"
    }
  ];

  constructor(private route: ActivatedRoute, private authService: AuthService) {
  }

  ngOnInit() {
    this.quizId = Number(this.route.snapshot.paramMap.get('id'))
    console.log('quiz id:', this.quizId);
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  ngAfterViewInit() {
    this.scrollToCurrentQuestion();
  }

  handleTimeout() {
    this.clearTimer();
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.nextQuestion();
    } else {
      this.submitQuiz();
    }
  }

  startQuiz() {
    this.authService.startQuiz(this.quizId).subscribe({
      next: (response) => {
        this.questions = response.questions;
        this.quizStarted = true;
        this.attemptedQuestions = new Array(this.questions.length).fill(false);
        this.selectedAnswer = new Array(this.questions.length);
      },
      error: (error) => console.error('Error fetching quiz questions:', error)
    });
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
      this.scrollToCurrentQuestion();
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.scrollToCurrentQuestion();
    }
  }

  goToQuestion(index: number) {
    this.currentQuestionIndex = index;
    this.scrollToCurrentQuestion();
  }

  onAnswerSelected(option: any) {
    const questionId = this.questions[this.currentQuestionIndex].id;
    console.log(option)
    if (option) {
      const selectedOption = option.option_id
      this.attemptedQuestions[this.currentQuestionIndex] = true;
      this.userAnswers[this.currentQuestionIndex] = {
        question_id: questionId,
        selected_option_id: selectedOption
      };
      this.selectedAnswer[this.currentQuestionIndex] = option
    }
  }


  isAttempted(index: number): boolean {
    return this.attemptedQuestions[index];
  }

  submitQuiz() {
    const submissionData = {
      quiz_id: this.quizId,
      answers: this.userAnswers
    };
  
    this.authService.submitQuiz(submissionData).subscribe({
      next: (response) => {
        this.quizCompleted = true;
        this.results = response.submitted_answers;
        this.score = response.total_score;
      },
      error: (error) => {
        alert('Login failed! ' + (error.error?.message || 'Quiz Submission Failed. Please try again later'));
      }
    });
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
    this.scrollToCurrentQuestion();
  }

  scrollToCurrentQuestion() {
    const trackerElement = this.tracker.nativeElement;
    const itemElement = trackerElement.querySelectorAll('.question-tracker-item')[this.currentQuestionIndex];
    if (itemElement) {
      itemElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  nextResultQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.scrollToCurrentQuestion();
    }
  }

  previousResultQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.scrollToCurrentQuestion();
    }
  }

  reviewAnswerFun() {
    this.reviewAnswer = true
    this.currentQuestionIndex = 0;
    this.scrollToCurrentQuestion();
  }

}