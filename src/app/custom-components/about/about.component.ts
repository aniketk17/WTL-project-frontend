import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  features = [
    { title: 'AI-Powered Insights', description: 'Coming soon......', icon: '🤖' },
    { title: 'Multi-Domain Quizzes', description: 'Explore various topics...', icon: '🌐' },
    { title: 'Performance Tracking', description: 'Review your Performance...', icon: '📈' }
  ];
}