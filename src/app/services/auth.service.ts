import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000';

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private ngZone: NgZone) {
    this.syncWithLocalStorage();
    window.addEventListener('storage', this.handleStorageEvent.bind(this));
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('access_token');
  }

  private syncWithLocalStorage() {
    setInterval(() => {
      const isLoggedIn = this.hasToken();
      if (isLoggedIn !== this.isLoggedInSubject.value) {
        this.ngZone.run(() => this.isLoggedInSubject.next(isLoggedIn));
      }
    }, 1000);
  }

  private handleStorageEvent(event: StorageEvent) {
    if (event.key === 'access_token') {
      this.ngZone.run(() => this.isLoggedInSubject.next(this.hasToken()));
    }
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

  register(user: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post<{ message: string }>(
      `${this.apiUrl}/auth/register/`,
      user
    );
  }
  

  login(user: {email: string, password: string}): Observable<any> {
    return this.http.post<{ access_token: string; refresh_token: string }>(
      `${this.apiUrl}/auth/login/`,
      user
    ).pipe(
      tap((tokens) => {
        this.storeTokens(tokens.access_token, tokens.refresh_token);
        this.isLoggedInSubject.next(true);
      })
    );
  }

  private storeTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.isLoggedInSubject.next(false);
  }

  getAllQuiz(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/quiz/`);
  }

  startQuiz(quizId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/quiz/${quizId}/start/`,{})
  }

  submitQuiz(submissionData: { quiz_id: number; answers: any[] }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/quiz-submissions/`, submissionData);
  }

  getUserPerformance(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/auth/user-performance`);
  }

  getUserDetails(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/auth/user-profile-details`)
  }
  
  updateUserProfile(result:any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/auth/user-profile-details/`, result)
  }
}
