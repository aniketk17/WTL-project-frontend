import { Component } from '@angular/core';

interface Developer {
  name: string;
  role: string;
  email: string;
  phone: string;
  bio: string;
  skills: string[];
  github?: string;
  linkedin?: string;
  avatar?: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: false
})
export class ContactComponent {
  developers: Developer[] = [
    {
      name: 'Aniket Kardile',
      role: 'Full Stack Developer',
      email: 'aniketkardile243@gmail.com',
      phone: '+91 9960350851',
      bio: 'Versatile developer comfortable with both frontend and backend technologies.',
      skills: ['Angular', 'TypeScript', 'HTML/CSS', 'DJANGO', 'SQL', 'NOSQL', 'DOCKER'],
      github: 'https://github.com/aniketk17',
      linkedin: 'https://linkedin.com/in/johndoe',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      name: 'Shrikant Kangude',
      role: 'Full Stack Developer',
      email: 'shrikantkangude@gmail.com',
      phone: '+1 (555) 987-6543',
      bio: 'Node.js expert focused on building scalable server-side applications.',
      skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
      github: 'https://github.com/janesmith',
      linkedin: 'https://linkedin.com/in/janesmith',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
      name: 'Alex Johnson',
      role: 'Full Stack Developer',
      email: 'alex.johnson@example.com',
      phone: '+1 (555) 456-7890',
      bio: 'Versatile developer comfortable with both frontend and backend technologies.',
      skills: ['Angular', 'React', 'Node.js', 'SQL'],
      github: 'https://github.com/alexjohnson',
      linkedin: 'https://linkedin.com/in/alexjohnson',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
    }
  ];

  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  onSubmit() {
    // Handle form submission
    console.log('Form submitted:', this.contactForm);
    alert('Thank you for your message! We will get back to you soon.');
    this.contactForm = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}