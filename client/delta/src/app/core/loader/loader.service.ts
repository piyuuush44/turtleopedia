import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {LoaderState} from './loader';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loaderSubject = new Subject<LoaderState>();

  loaderState = this.loaderSubject.asObservable();

  constructor() {
  }

  show() {
    console.log('inside loader service show');
    const obj: LoaderState = {show: true};
    this.loaderSubject.next({show: true} as LoaderState);
  }

  hide() {
    console.log('inside loader service hide');
    const obj: LoaderState = {show: false};
    this.loaderSubject.next(obj);
  }
}
