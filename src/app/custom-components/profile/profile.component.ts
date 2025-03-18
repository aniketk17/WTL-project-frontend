import { Component } from '@angular/core';

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

  user = {
    name: 'Aniket Kardile',
    role: 'Software Developer',
    location: 'Bay Area, San Francisco, CA',
    email: 'kardileaniket706.com',
    phone: '9960350851',
    college: 'Pune Institute of Computer Technology',
  };

  performance = {
    quizzesTaken: 25,
    accuracy: '85%',
    averageScore: '78%',
    highestScore: '95%',
    fastestCompletion: '12 mins'
  };

  leaderboard = [
    { rank: 1, name: 'Aryan Sharma', score: '98%' },
    { rank: 2, name: 'Riya Patel', score: '95%' },
    { rank: 3, name: 'Rahul Verma', score: '92%' },
    { rank: 4, name: 'Aniket Kardile', score: '90%' },
    { rank: 5, name: 'Neha Gupta', score: '88%' }
  ];

  toggleFollow() {
    this.isFollowing = !this.isFollowing;
  }

  openMessageBox() {
    this.showMessageBox = true;
  }

  sendMessage() {
    if (this.messageText.trim()) {
      alert(`Message sent: ${this.messageText}`);
      this.messageText = ''; 
      this.showMessageBox = false;
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveChanges() {
    this.isEditing = false;
  }
}
