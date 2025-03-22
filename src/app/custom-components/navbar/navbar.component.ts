import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: false
})
export class NavbarComponent {
  constructor(private dialog: MatDialog) {}

  openRegister() {
    // console.log("open")
    // this.dialog.open(RegisterModalComponent, {
    //   width: '80%',
    //   maxWidth: '400px',
    //   autoFocus: false,
    //   disableClose: true,
    // });
  }
}