import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../Service/contact.service';
import { CommonModule } from '@angular/common';
import { Contact } from '../../models/contact';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, RouterLink,   HttpClientModule, FormsModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5; 
  sortColumn: keyof Contact = 'firstName'; 
  sortDirection: 'asc' | 'desc' = 'asc'; 

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactService.getContacts().subscribe(
      (data: Contact[]) => {
        this.contacts = data;
        this.applyFilters();
      },
      (error) => {
        console.error("Error fetching contacts", error);
      }
    );
  }

  applyFilters(): void {
    this.filteredContacts = this.contacts.filter(contact =>
      contact.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.sortContacts(); 
    this.currentPage = 1;
  }

  sortContacts(): void {
    const modifier = this.sortDirection === 'asc' ? 1 : -1;
    this.filteredContacts.sort((a, b) => {
      if (a[this.sortColumn] < b[this.sortColumn]) return -1 * modifier;
      if (a[this.sortColumn] > b[this.sortColumn]) return 1 * modifier;
      return 0;
    });
  }

  deleteContact(id: number): void {
    this.contactService.deleteContact(id).subscribe(
      () => this.loadContacts(),
      (error) => console.error("Error deleting contact", error)
    );
  }

  get paginatedContacts(): Contact[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredContacts.slice(startIndex, startIndex + this.itemsPerPage);
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  setSort(column: keyof Contact): void {
 
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc'; 
    }
    this.sortContacts(); 
  }

  get totalPages(): number {
    return Math.ceil(this.filteredContacts.length / this.itemsPerPage);
  }
} 

