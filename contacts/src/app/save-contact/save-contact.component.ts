import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpInterceptor} from './../http.interceptor';
import {Contact, Information} from '../shared/Contact';
import {NgForm} from '@angular/forms';

const contactGetUrl = "http://localhost:4300/contacts/";
const saveContactUrl = "http://localhost:4300/contacts";
@Component({
  selector: 'app-save-contact',
  templateUrl: './save-contact.component.html',
  styleUrls: ['./save-contact.component.css']
})
export class SaveContactComponent implements OnInit {
  contactId : string;
  contact: Contact;
  informationTypes: string[] = ["mobile", "email"];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpInterceptor) { }

  ngOnInit() {
    this.contactId = this.route.snapshot.paramMap.get('contactId');
    this.contact = new Contact();
    if(this.contactId){
      this.http.get(contactGetUrl + this.contactId).subscribe(data => {
        this.contact = <Contact>data;
        if(!this.contact.informations ||  this.contact.informations.length === 0){
          this.addInformation();
        }
      })
    } else {
      this.addInformation();
    }
  }

  addInformation():void {
    if(this.contact.informations === undefined){
      this.contact.informations = [];
    }
    this.contact.informations.push(new Information());
  }

  onSubmit(form: NgForm): void{
    if(form.valid && this.contactId){
      this.http.put(saveContactUrl + "/" +this.contactId , this.contact).subscribe(data => {
        this.router.navigateByUrl("/list");
      });
    } else if(form.valid){
      this.http.post(saveContactUrl, this.contact).subscribe(data => {
        this.router.navigateByUrl("/list");
      });
    }
  }

  cancelSaveContact(): void{
    this.router.navigateByUrl("/list");
  }
}
