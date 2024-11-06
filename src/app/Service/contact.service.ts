import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
    private apiUrl = 'https://localhost:7178/api/'; 

    constructor(private http: HttpClient) {}

    getContacts(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}Contacts`);
    }

    getContactById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}Contacts/get/${id}`);
    }

    createContact(contact: Contact): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}Contacts/create`, contact);
    }

    updateContact(id: number, contact: Contact): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}Contacts/update/${id}`, contact);
    }

    deleteContact(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}Contacts/delete/${id}`);
    }
}
