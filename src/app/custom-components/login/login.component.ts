import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: false
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, this.usernameOrEmailValidator]],
      password: ['', [Validators.required]]
    },);
  }

  usernameOrEmailValidator(control: any) {
    const value = control.value.trim();
    
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const isEmail = emailRegex.test(value);

    const isUsername = /^[a-zA-Z0-9]+$/.test(value);

    if (!isEmail && !isUsername) {
      return { invalidUsernameOrEmail: true };
    }

    return null;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login Successful', this.loginForm.value);
    } else {
      console.log('Invalid Login Form');
    }
  }
}
