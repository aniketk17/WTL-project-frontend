import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faUser, faEnvelope, faLock, faEye, faEyeSlash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.scss'],
  standalone: false
})
export class RegisterModalComponent implements OnInit {
  registerForm!: FormGroup;
  isPasswordVisible = false;
  isConfirmPasswordVisible = false;
  
  // FontAwesome Icons
  faUser = faUser;
  faEnvelope = faEnvelope;
  faLock = faLock;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faTimes = faTimes;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RegisterModalComponent>
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toggleConfirmPasswordVisibility(): void {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Form submitted:', this.registerForm.value);
      this.dialogRef.close(this.registerForm.value);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  loginInstead(): void {
    // Here you would navigate to login or open login dialog
    this.dialogRef.close('login');
  }
}