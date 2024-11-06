import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContactService } from '../../Service/contact.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.scss'
})
export class ContactEditComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private contactService: ContactService,
    public router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));  
    this.contactForm = this.fb.group({
      id: [0],
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]]
    });

    if (id) {
      this.contactService.getContactById(id).subscribe(
        (data: Contact) => {
          this.contactForm.patchValue(data); 
        },
        (error) => {
          console.error("Error loading contact details", error);
        }
      );
    }
  }

  updateContact(): void {
    if (this.contactForm.valid) {
      this.contactService.updateContact(this.contactForm.value.id, this.contactForm.value).subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (error) => {
          console.error("Error updating contact", error);
        }
      );
    }
  }
}