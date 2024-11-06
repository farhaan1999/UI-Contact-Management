import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
// import { ContactFormComponent } from './Component/contact-form/contact-form.component'; 
import { ContactListComponent } from './Component/contact-list/contact-list.component'; // Import ContactListComponent if it exists
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule], // Import components here
  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Fix styleUrls typo
})
export class AppComponent {
  reloadContacts() {
    // Logic to reload contacts
  }
} 
 