import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: false,
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() totalSeconds: number = 1800; // Default 30 minutes
  @Input() format: string = 'hr:min:sec';
  
  timeRemaining: number;
  progressPercentage: number;
  formattedTime: string = '';
  private timerInterval: any;

  constructor() {
    this.timeRemaining = this.totalSeconds;
    this.progressPercentage = 100;
  }

  ngOnInit() {
    this.startTimer();
    this.updateFormattedTime();
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  private startTimer() {
    this.timerInterval = setInterval(() => {
      this.timeRemaining--;
      this.progressPercentage = (this.timeRemaining / this.totalSeconds) * 100;
      this.updateFormattedTime();

      if (this.timeRemaining <= 0) {
        this.stopTimer();
        // this.onTimerComplete();
      }
    }, 1000);
  }

  private updateFormattedTime() {
    const hours = Math.floor(this.timeRemaining / 3600);
    const minutes = Math.floor((this.timeRemaining % 3600) / 60);
    const seconds = this.timeRemaining % 60;

    if (this.format === 'hr:min:sec') {
      this.formattedTime = this.formatTime(hours) + ':' + 
                            this.formatTime(minutes) + ':' + 
                            this.formatTime(seconds);
    } else {
      this.formattedTime = this.formatTime(minutes) + ':' + 
                            this.formatTime(seconds);
    }
  }

  private formatTime(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }

  private stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

}