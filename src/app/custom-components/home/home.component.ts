import { Component, ViewChild, ElementRef } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  signUp: boolean = true;
  allCategories = [
    {
      "id": 1,
      "category": {
        "id": 2,
        "name": "health"
      },
      "title": "Heart end meeting live trial sure success.",
      "description": "Reduce support customer yourself. Address than spring let.",
      "created_at": "2025-03-20T09:47:35.315718Z",
      "updated_at": "2025-03-20T09:47:35.315769Z"
    },
    {
      "id": 2,
      "category": {
        "id": 2,
        "name": "health"
      },
      "title": "Fish girl politics author kitchen upon effect.",
      "description": "Full simply sense see either do. Drug this west live.",
      "created_at": "2025-03-20T09:47:35.317835Z",
      "updated_at": "2025-03-20T09:47:35.317856Z"
    },
    {
      "id": 3,
      "category": {
        "id": 2,
        "name": "health"
      },
      "title": "Success economic wonder sea result compare dinner.",
      "description": "Growth cover firm maybe. Game identify professor world three serious. The every half.",
      "created_at": "2025-03-20T09:47:35.319668Z",
      "updated_at": "2025-03-20T09:47:35.319690Z"
    },
    {
      "id": 4,
      "category": {
        "id": 3,
        "name": "officer"
      },
      "title": "Thus agreement without certainly southern key.",
      "description": "Exist nearly crime although animal resource. Former free single better. Financial investment across build able.",
      "created_at": "2025-03-20T09:47:35.321346Z",
      "updated_at": "2025-03-20T09:47:35.321366Z"
    },
    {
      "id": 5,
      "category": {
        "id": 3,
        "name": "officer"
      },
      "title": "Treatment whether perform opportunity.",
      "description": "Until seek source later return it. Rest watch present environment. Woman but again local direction about.",
      "created_at": "2025-03-20T09:47:35.322952Z",
      "updated_at": "2025-03-20T09:47:35.322970Z"
    }
  ];
  paginatedCategories: any = [];
  pageSize: number = 12;
  currentPage: number = 0;
  searchQuery: string = '';
  selectedFilter: string = 'all';
  isDarkMode: boolean = false;
  isLoggedIn: boolean = false;
  categoryNames: any = [];

  showQuizzesSection: boolean = false;
  @ViewChild('quizSection', { static: false }) quizSection!: ElementRef;
  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.fetchAllQuizzes();
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    setTimeout(() => {
      this.addScrollAnimation();
    }, 100); // Small delay to allow data rendering
  }


  fetchAllQuizzes() {
    this.authService.getAllQuiz().subscribe(
      (categories) => {
        this.allCategories = categories;
        console.log(this.allCategories[0]);

        // Set category names after categories are fetched
        this.categoryNames = new Set(this.allCategories.map(category => category.category.name));
        console.log(this.categoryNames);

        this.updatePaginatedCategories();
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }



  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }

  // Show the quizzes section
  showQuizzes(): void {
    this.showQuizzesSection = true;

    // Scroll to the quizzes section after a short delay to allow the DOM to update
    setTimeout(() => {
      this.quizSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  updatePaginatedCategories() {
    let filteredCategories = this.allCategories;

    // Filter by search query (case-insensitive)
    if (this.searchQuery) {
      console.log("search-query:", this.searchQuery)
      const searchLower = this.searchQuery.toLowerCase();
      filteredCategories = filteredCategories.filter(category =>
        category.title.toLowerCase().includes(searchLower)
      );
    }

    // Filter by selected filter (category name instead of title)
    if (this.selectedFilter !== 'all') {
      filteredCategories = filteredCategories.filter(category =>
        category.category.name === this.selectedFilter
      );
    }

    // Apply pagination
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedCategories = filteredCategories.slice(startIndex, endIndex);
    console.log(this.paginatedCategories);
  }


  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedCategories();
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value.toLowerCase();
    this.updatePaginatedCategories();
  }

  onFilterChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedFilter = select.value;
    this.updatePaginatedCategories();
  }

  getProgress(category: any): number {

    return Math.floor(Math.random() * 100);
  }

  getTimeLeft(category: any): string {

    const minutes = Math.floor(Math.random() * 60);
    const seconds = Math.floor(Math.random() * 60);
    return `${minutes}m ${seconds}s`;
  }


  addScrollAnimation() {
    const getStartedBtn = document.getElementById('get-started-btn');
    if (getStartedBtn) {
      getStartedBtn.addEventListener('click', () => {
        const quizSection = document.getElementById('quiz-section');
        if (quizSection) {
          quizSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  startQuiz(category: any) {
    const quizId = category.id;
    this.router.navigate(['/quiz', quizId])
  }
}