import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {RouterModule, Routes} from '@angular/router'
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdListModule, MdGridListModule, MdIconModule, MdButtonModule, MdCardModule, 
  MdInputModule, MdSelectModule, MdTooltipModule, MdDialogModule, MdProgressBarModule} from '@angular/material';

import { AppComponent } from './app.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { SaveContactComponent } from './save-contact/save-contact.component';
import { ContactDetailsComponent, ContactDeleteConfirmationDialog } from './contact-details/contact-details.component';
import {HttpInterceptor} from './http.interceptor';

const appRoutes : Routes = [
  {path: 'list', component: ContactListComponent},
  {path: 'create', component: SaveContactComponent},
  {path: 'edit/:contactId', component: SaveContactComponent},
  {path: '', redirectTo: '/list', pathMatch: 'full'},
  {path: '**', redirectTo: '/list', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    SaveContactComponent,
    ContactDetailsComponent,
    ContactDeleteConfirmationDialog
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {
      enableTracing: true
    }),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MdListModule,
    MdIconModule,
    MdButtonModule,
    MdGridListModule,
    MdCardModule,
    MdInputModule,
    MdSelectModule,
    MdTooltipModule,
    MdDialogModule,
    MdProgressBarModule
  ],
  providers: [HttpInterceptor],
  bootstrap: [AppComponent],
  entryComponents: [ContactDeleteConfirmationDialog]
})

export class AppModule {
}
