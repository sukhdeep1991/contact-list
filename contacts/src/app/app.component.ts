import { Component, ChangeDetectorRef} from '@angular/core';
import {HttpInterceptor} from './http.interceptor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Contacts';
  httpInProgress: boolean = false;

  constructor(private http: HttpInterceptor, private changeDetectorRef: ChangeDetectorRef){
    this.http.HttpInProgressObservable.subscribe(data => {
      this.httpInProgress = data;
      if(data){
          this.changeDetectorRef.detectChanges();
      }
    });
  }
}
