import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileFormComponent } from '../profile-form/profile-form.component'; // Adjust path as needed
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  isFollowing = false;
  messageText = '';
  showMessageBox = false;
  isEditing = false;

  user: any;

  performance = {
    quizzesTaken: 0,
    accuracy: '0%',
    averageScore: 0,
    highestScore: 0,
  };

  leaderboard = [
    { rank: 1, name: 'Aryan Sharma', score: '98%' },
    { rank: 2, name: 'Riya Patel', score: '95%' },
    { rank: 3, name: 'Rahul Verma', score: '92%' },
    { rank: 4, name: 'Aniket Kardile', score: '90%' },
    { rank: 5, name: 'Neha Gupta', score: '88%' }
  ];

  constructor(private dialog: MatDialog, private authService: AuthService) { }


  ngOnInit() {
    this.fetchUserPerformance();
    this.getUserDetails();
  }

  toggleFollow() {
    this.isFollowing = !this.isFollowing;
  }

  openMessageBox() {
    this.showMessageBox = true;
  }

  fetchUserPerformance() {
    this.authService.getUserPerformance().subscribe(
      (data) => {
        this.performance = {
          quizzesTaken: data.quizzes_taken,
          accuracy: data.accuracy,
          averageScore: data.average_score,
          highestScore: data.highest_score
        };
      },
      (error) => {
        console.error("Error fetching performance data:", error);
      }
    );
  }

  getUserDetails() {
    this.authService.getUserDetails().subscribe(
      (response: any) => {
        if (!response || !response.user || !response.profile) {
          console.error("Invalid user data received", response);
          return;
        }
  
        const { user, profile } = response;
  
        this.user = {
          username: user.username,
          name: profile.first_name || 'Not Available',
          phone: profile.phone_number || 'Not Available',
          college: profile.institute_name || 'Not Available',
          address: profile.address || 'Not Available',
          email: user.email || 'Not Available',
          bio: profile.bio || 'Not Available',
          profilePic: profile.profile_pic || 'https://example.com/default-profile.jpg'
        };
  
        console.log("User details fetched successfully", this.user);
      },
      (error) => {
        console.error("Error fetching user details", error);
      }
    );
  }
  


  sendMessage() {
    if (this.messageText.trim()) {
      alert(`Message sent: ${this.messageText}`);
      this.messageText = '';
      this.showMessageBox = false;
    }
  }

  toggleEdit() {
    const dialogRef = this.dialog.open(ProfileFormComponent, {
      width: '500px',
      data: {
        fullName: this.user.name,
        phone: this.user.phone,
        college: this.user.college,
        address: this.user.address,
        bio: this.user.bio,
        isEdit: true
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const temp = {
          first_name: result.fullName,
          phone_number: result.phone,
          institute_name: result.college,
          address: result.address,
          bio: result.bio
        }
        this.authService.updateUserProfile(temp).subscribe({
          next: (user) => {
            this.user = {
              name: user.first_name,
              phone: user.phone_number || 'Not Available',
              college: user.institute_name || 'Not Available',
              address: user.address || 'Not Available',
              email: user.email || 'Not Available',
              bio: user.bio || 'Not Available',
            };
          },
          error: (error) => {
            console.error('Error updating profile:', error);
          }
        });
      }
    });
  }

  saveChanges() {
    this.isEditing = false;
  }
}