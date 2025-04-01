import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faUser, faLock, faEye, faEyeSlash, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons'; // Import Google icon
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: false,
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  faUser = faUser;
  faLock = faLock;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faEnvelope = faEnvelope;
  faGoogle = faGoogle;

  // Password visibility states
  isPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;

  // Message to display to the user
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, // Inject ApiService
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Form submission handler
  onSubmit() {
    if (this.registerForm.valid) {
      const user = {
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      };

      this.authService.register(user).subscribe(
        (response) => {
          this.message = 'Registration successful!';
          this.router.navigate(['/login']);
        },
        (error) => {
          this.message = 'Registration failed. Please try again.';
          alert('Login failed! ' + (error.error?.message || 'Registration failed. Please try again.'));
          console.error('Registration error:', error);
        }
      );
    } else {
      this.message = 'Please fill out the form correctly.';
    }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toggleConfirmPasswordVisibility() {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }
}