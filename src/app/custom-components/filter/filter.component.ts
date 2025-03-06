import { Component } from '@angular/core';

@Component({
  selector: 'app-filter',
  standalone: false,
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  toggle: boolean = false;
  chips = ['Aptitude', 'Programming', 'General Knowledge'];
  selectedChips: number[] = [];

  onClick() {
    if (this.toggle) {
      this.toggle = false;
    }
    else {
      this.toggle = true;
    }
  }

  toggleChip(index: number) {
    const chipIndex = this.selectedChips.indexOf(index);

    if (chipIndex !== -1) {
      this.selectedChips.splice(chipIndex, 1);
    } else {
      this.selectedChips.push(index);
    }
  }

}
