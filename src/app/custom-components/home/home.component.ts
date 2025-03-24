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
    { title: 'Science', info: 'Explore quizzes on physics, chemistry, biology, and more.' },
    { title: 'Mathematics', info: 'Challenge yourself with quizzes on algebra, calculus, and geometry.' },
    { title: 'History', info: 'Test your knowledge of ancient civilizations, world wars, and historical events.' },
    { title: 'Geography', info: 'Quizzes on countries, capitals, mountains, and rivers of the world.' },
    { title: 'Technology', info: 'Stay sharp with quizzes on programming, AI, and latest tech trends.' },
    { title: 'Sports', info: 'From football to Formula 1—test your sports trivia skills!' },
    { title: 'Literature', info: 'Quizzes about famous authors, books, and literary movements.' },
    { title: 'Movies & TV', info: 'Guess the movies, actors, and iconic TV shows from around the world.' },
    { title: 'Music', info: 'How well do you know global music hits, bands, and genres?' },
    { title: 'Art & Design', info: 'Questions on famous paintings, artists, and design concepts.' },
    { title: 'General Knowledge', info: 'Test your overall knowledge with mixed-topic quizzes.' },
    { title: 'Business & Economics', info: 'From startups to stock markets—explore business trivia.' },
    { title: 'Health & Fitness', info: 'Learn and test knowledge about health tips, workouts, and nutrition.' },
    { title: 'Mythology', info: 'Dive into the myths and legends from different cultures.' },
    { title: 'Food & Cooking', info: 'Tasty trivia on world cuisines, chefs, and cooking techniques.' },
    { title: 'Travel', info: 'Trivia on famous landmarks, travel tips, and tourist hotspots.' },
    { title: 'Politics', info: 'Quizzes on global leaders, policies, and political history.' },
    { title: 'Language & Grammar', info: 'Test your grammar skills and language knowledge.' },
    { title: 'Comics & Animation', info: 'From Marvel to Manga—quizzes for comic and animation fans.' },
    { title: 'Environment', info: 'Learn about climate change, sustainability, and the environment.' },
    { title: 'Psychology', info: 'Explore quizzes on human behavior, mental health, and theories.' },
    { title: 'Astronomy', info: 'Test your knowledge of stars, planets, galaxies, and the universe.' },
    { title: 'Fashion', info: 'Questions about fashion trends, designers, and iconic styles.' },
    { title: 'Current Affairs', info: 'Stay updated with quizzes on recent global events and news.' },
  ];
  paginatedCategories: any = [];
  pageSize: number = 12;
  currentPage: number = 0;
  searchQuery: string = '';
  selectedFilter: string = 'all';
  isDarkMode: boolean = false;
  isLoggedIn: boolean = false; // Track user's login status
  showQuizzesSection: boolean = false; // Control visibility of quizzes section
  @ViewChild('quizSection', { static: false }) quizSection!: ElementRef;
  constructor(private router: Router, private authService: AuthService) {
  } 

  ngOnInit() {
    this.updatePaginatedCategories();
    this.addScrollAnimation();
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
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

    // Filter by search query
    if (this.searchQuery) {
      filteredCategories = filteredCategories.filter(category =>
        category.title.toLowerCase().includes(this.searchQuery)
      );
    }

    // Filter by selected filter
    if (this.selectedFilter !== 'all') {
      filteredCategories = filteredCategories.filter(category =>
        category.title === this.selectedFilter
      );
    }

    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedCategories = filteredCategories.slice(startIndex, endIndex);
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
    this.router.navigate(['/quiz'], { queryParams: { category: category.title } });
  }
}