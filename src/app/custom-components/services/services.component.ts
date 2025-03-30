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
      id: 1,
      title: 'Smart Quiz Generation',
      description: 'AI-powered quiz creation across multiple domains with adaptive difficulty based on your performance',
      icon: '🧩',
      features: [
        'Topic-based quiz selection',
        'Dynamic question generation',
        'Personalized difficulty adjustment'
      ],
      isPopular: true,
      comingSoon: false
    },
    {
      id: 2,
      title: 'AI Learning Assistant',
      description: 'Get detailed explanations for answers and personalized learning recommendations',
      icon: '🤖',
      features: [
        'Answer explanations',
        'Mistake analysis',
        'Personalized study tips'
      ],
      isPopular: false,
      comingSoon: false
    },
    {
      id: 3,
      title: 'Performance Analytics',
      description: 'Track your progress with detailed statistics and historical data',
      icon: '📊',
      features: [
        'Score history',
        'Weakness identification',
        'Progress visualization'
      ],
      isPopular: true,
      comingSoon: false
    },
    {
      id: 4,
      title: 'Multi-Device Sync',
      description: 'Seamless experience across all your devices with cloud synchronization',
      icon: '🔄',
      features: [
        'Cross-platform access',
        'Progress synchronization',
        'Offline mode available'
      ],
      isPopular: false,
      comingSoon: true
    }
  ];

  testimonials = [
    {
      id: 1,
      quote: "This platform helped me identify my weak areas and improve my test scores significantly!",
      author: "Sarah K.",
      role: "Medical Student",
      rating: 5,
      avatar: '👩‍⚕️'
    },
    {
      id: 2,
      quote: "The AI explanations are incredibly helpful for understanding complex concepts.",
      author: "Michael T.",
      role: "IT Professional",
      rating: 4,
      avatar: '👨‍💻'
    },
    {
      id: 3,
      quote: "I love how the quizzes adapt to my learning level. It's challenging but not overwhelming.",
      author: "Priya M.",
      role: "High School Teacher",
      rating: 5,
      avatar: '👩‍🏫'
    }
  ];

  platformStats = {
    users: '50,000+',
    questions: '100,000+',
    accuracy: '98%',
    subjects: '50+'
  };

  activeTab: string = 'all';

  get filteredServices() {
    switch(this.activeTab) {
      case 'popular':
        return this.services.filter(service => service.isPopular);
      case 'comingSoon':
        return this.services.filter(service => service.comingSoon);
      default:
        return this.services;
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}
