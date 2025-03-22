import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: false
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  
  onSubscribe(event: Event) {
    event.preventDefault();
    // Handle newsletter subscription logic here
    const emailInput = document.querySelector('.newsletter-form input') as HTMLInputElement;
    const email = emailInput.value.trim();
    
    if (email && this.isValidEmail(email)) {
      console.log('Newsletter subscription for:', email);
      // Add your API call or service method here
      alert('Thank you for subscribing!');
      emailInput.value = '';
    } else {
      alert('Please enter a valid email address');
    }
  }
  
  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
}