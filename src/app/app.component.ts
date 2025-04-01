import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'quiz-app-v2';
  isQuizPage = false;
  isProfilePage = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event=>{
      if(event instanceof NavigationEnd) {
        this.isQuizPage = event.url.includes('/quiz')
        this.isProfilePage = event.url.includes('/profile')
      }
    })
  }
}
