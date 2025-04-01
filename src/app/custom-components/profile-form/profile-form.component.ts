import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-form',
  standalone: false,
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit {
  profileForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProfileFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.profileForm = this.fb.group({
      fullName: [
        this.data?.fullName || '', 
        [Validators.minLength(2)] // Removed required
      ],
      phone: [
        this.data?.phone || '', 
        [
          Validators.pattern(/^[0-9]{10}$/) // Removed required
        ]
      ],
      college: [
        this.data?.college || '' // Removed required
      ],
      address: [
        this.data?.address || '' // Removed required
      ],
      bio: [
        this.data?.bio || '' // Optional field
      ]
    });
  }

  onSave(): void {
    if (this.profileForm.valid) {
      this.dialogRef.close(this.profileForm.value);
    } else {
      // Mark all fields as touched to show validation messages
      this.markFormGroupTouched(this.profileForm);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}