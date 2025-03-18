import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  standalone: false,
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  @Input() user: any;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  tempUser: any = {};

  ngOnInit() {
    this.tempUser = { ...this.user }; // Create a copy to avoid direct changes
  }

  saveChanges() {
    this.save.emit(this.tempUser);
  }

  cancelEdit() {
    this.cancel.emit();
  }
}
