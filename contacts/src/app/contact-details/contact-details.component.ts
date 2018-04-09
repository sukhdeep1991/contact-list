import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {Contact} from '../shared/Contact';
import {MdDialog, MdDialogRef} from '@angular/material';
import {HttpInterceptor} from './../http.interceptor';

const deleteContactUrl = "http://localhost:4300/contacts/";

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  @Input() contact: Contact;
  @Output() contactDelete = new EventEmitter<number>();

  constructor(private mdDialog: MdDialog,
      private http: HttpInterceptor) { }

  ngOnInit() {
  }

  deleteContact(): void{
      var dialogRef = this.mdDialog.open(ContactDeleteConfirmationDialog);
      dialogRef.afterClosed().subscribe(result => {
          if(result === "true"){
              this.http.delete(deleteContactUrl + this.contact._id).subscribe(result => {
                  this.contact = new Contact();
                  this.contactDelete.emit();
              });
          }
      });
  }
}

@Component({
    selector: "contact-delete-confirmation-dialog",
    templateUrl: './contact-delete-confirmation-dialog.html'
})
export class ContactDeleteConfirmationDialog {
    constructor(public mdDialogRef: MdDialogRef<ContactDeleteConfirmationDialog>){}
}
