import { Component } from '@angular/core';

@Component({
  selector: 'app-quiz-generation',
  templateUrl: './quiz-generation.component.html',
  styleUrls: ['./quiz-generation.component.css'],
  standalone: false
})
export class QuizGenerationComponent {
  selectedFile: File | null = null;
  customPrompt: string = '';
  loading: boolean = false;


  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.selectedFile = event.dataTransfer.files[0];
    }
  }

  submit() {
    if (!this.selectedFile || !this.customPrompt) return;
    this.loading = true;

    // Simulating API call
    setTimeout(() => {
      this.loading = false;
      alert('Quiz generated successfully!');
    }, 2000);
  }
}
