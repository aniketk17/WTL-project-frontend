import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Import CommonModule

@Component({
  selector: 'app-about-us',
  standalone: true, // ✅ Keep standalone
  imports: [CommonModule], // ✅ Import CommonModule to enable *ngFor
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  features = [
    { title: 'AI-Powered Insights', description: 'Get detailed explanations...', icon: '🤖' },
    { title: 'Multi-Domain Quizzes', description: 'Explore various topics...', icon: '🌐' },
    { title: 'Performance Tracking', description: 'Review your quiz history...', icon: '📈' }
  ];
}
