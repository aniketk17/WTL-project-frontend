import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
      this.registerForm = this.fb.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },{ validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value
    return password == confirmPassword ? null : { mismatch: true}
  }

  onSubmit() {
    if(this.registerForm.valid) {
      console.log('Form Submitted! ', this.registerForm.value);
    }
    else {
      console.log('Form is invalid');
    }
  }
}
