import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-typewriter',
  templateUrl: './typewriter.component.html',
  styleUrls: ['./typewriter.component.css'],
  standalone: false
})
export class TypewriterComponent implements OnInit {
  text: string = ''; 
  fullText: string = 'Unleash Your Inner Quiz Master!';
  typingSpeed: number = 100;
  eraseSpeed: number = 50; 
  isTyping: boolean = true;

  ngOnInit(): void {
    this.typewrite();
  }

  typewrite(): void {
    console.log("typing")
    if (this.isTyping) {
      if (this.text.length < this.fullText.length) {
        this.text += this.fullText[this.text.length];
        setTimeout(() => this.typewrite(), this.typingSpeed);
      } else {
        this.isTyping = false;
        setTimeout(() => this.typewrite(), 1000);
      }
    } else {
      if (this.text.length > 0) {
        this.text = this.text.slice(0, -1);
        setTimeout(() => this.typewrite(), this.eraseSpeed);
      } else {
        this.isTyping = true;
        setTimeout(() => this.typewrite(), 500);
      }
    }
  }
}