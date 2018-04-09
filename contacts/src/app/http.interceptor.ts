import {Injectable} from "@angular/core";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/finally';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class HttpInterceptor extends HttpClient{
  private HttpInprogressSource = new Subject<boolean>();

  HttpInProgressObservable = this.HttpInprogressSource.asObservable();

  constructor(handler: HttpHandler) {
      super(handler);
  }

  get(url: string, options?): Observable<Object> {
      return this.intercept(super.get(url, options));
  }

  post(url: string, body: any, options?): Observable<Object> {
      return this.intercept(super.post(url, body, options));
  }

  put(url: string, body: any, options?): Observable<Object> {
      return this.intercept(super.put(url, body, options));
  }

  delete(url: string, options?): Observable<Object> {
    return this.intercept(super.delete(url, options));
  }

  intercept(observable: Observable<Object>) : Observable<Object>{
    this.HttpInprogressSource.next(true);

    /*observable.subscribe( data => {},  error => {},  () => {
      this.HttpInprogressSource.next(false);
    });*/
    return observable.finally(() => {
      this.HttpInprogressSource.next(false);
    });
  }
}