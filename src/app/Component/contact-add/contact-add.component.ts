import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../Service/contact.service';
import { Router, RouterLink } from '@angular/router';
import { Contact } from '../../models/contact';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-add',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './contact-add.component.html',
  styleUrl: './contact-add.component.scss'
})   

export class ContactAddComponent implements OnInit {
  contactForm: FormGroup; 

  constructor(
    private fb: FormBuilder, 
    private contactService: ContactService,
    private router: Router
  ) {
    
    this.contactForm = this.fb.group({
      id: [0],
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]], 
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]], 
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    
  }

  addContact(): void {
    if (this.contactForm.valid) {
      const contact: Contact = this.contactForm.value; 
      this.contactService.createContact(contact).subscribe(
        () => {
          this.router.navigate(['/']); 
        },
        (error) => {
          console.error('Error creating contact:', error); 
        }
      );
    } else {
      this.contactForm.markAllAsTouched();
      console.error('Form is invalid:', this.contactForm.errors);
    }
  }
}
