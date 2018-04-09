import {Component, OnInit } from '@angular/core';
import {HttpInterceptor} from './../http.interceptor';
import {Contact} from '../shared/Contact';

const contactGetUrl : string = "http://localhost:4300/contacts";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts : Contact[];
  selectedContact: Contact;

  constructor(private http: HttpInterceptor) { }

  ngOnInit():void {
    this.http.get(contactGetUrl).subscribe(data => {
      this.contacts = <Contact[]> data;
    });
  }

  getContactTitle(contact: Contact) : string{
    return contact.lastName + " " + contact.firstName;
  }

  selectContact(contact: Contact): void {
    this.selectedContact = contact;
  }

  deleteSelectedContact(): void{
    this.contacts.splice(this.contacts.indexOf(this.selectedContact), 1);
    this.selectedContact = undefined;
  }
}