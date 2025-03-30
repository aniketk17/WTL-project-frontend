import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  standalone: false,
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  services = [
    {
      title: 'Smart Quiz Generation',
      description: 'AI-powered quiz creation across multiple domains with adaptive difficulty based on your performance',
      icon: '🧩',
      features: [
        'Topic-based quiz selection',
        'Dynamic question generation',
        'Personalized difficulty adjustment'
      ]
    },
    {
      title: 'AI Learning Assistant',
      description: 'Get detailed explanations for answers and personalized learning recommendations',
      icon: '🤖',
      features: [
        'Answer explanations',
        'Mistake analysis',
        'Personalized study tips'
      ]
    },
    {
      title: 'Performance Analytics',
      description: 'Track your progress with detailed statistics and historical data',
      icon: '📊',
      features: [
        'Score history',
        'Weakness identification',
        'Progress visualization'
      ]
    },
    {
      title: 'Multi-Device Sync',
      description: 'Seamless experience across all your devices with cloud synchronization',
      icon: '🔄',
      features: [
        'Cross-platform access',
        'Progress synchronization',
        'Offline mode available'
      ]
    }
  ];

  testimonials = [
    {
      quote: "This platform helped me identify my weak areas and improve my test scores significantly!",
      author: "Sarah K., Student"
    },
    {
      quote: "The AI explanations are incredibly helpful for understanding complex concepts.",
      author: "Michael T., Lifelong Learner"
    }
  ];
}