import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

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
    private router: Router
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
      console.log('Form submitted:', this.loginForm.value);
      // this.router.navigate(['/dashboard']);
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