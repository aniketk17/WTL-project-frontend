import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent implements OnInit {
  faUser = faUser;
  faLock = faLock;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  loginForm!: FormGroup;
  isPasswordVisible = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService,
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, this.usernameOrEmailValidator]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  usernameOrEmailValidator(control: AbstractControl) {
    const value = control.value as string;
    if (!value) return null;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

    return emailRegex.test(value) || usernameRegex.test(value) ? null : { invalidUsernameOrEmail: true };
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
    const passwordInput = document.getElementById('password') as HTMLInputElement;

    if (passwordInput) {
      passwordInput.type = this.isPasswordVisible ? 'text' : 'password';
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const user = {
        email: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };
      this.apiService.login(user).subscribe(
        (response: any) => {
          console.log('Login successful:', response);
          
          // Store tokens in localStorage
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('refresh_token', response.refresh_token);
  
          // Navigate to home
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Login error:', error);
        }
      );
    } else {
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }

  loginWithGoogle() {
    console.log('Google login initiated');
  }
}