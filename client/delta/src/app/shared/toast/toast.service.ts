import {Injectable, TemplateRef} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() {
  }

  toasts: any[] = [];

  showDefault(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({textOrTpl, classname: 'bg-bluish text-light', delay: 3000});
  }

  showSuccess(textOrTpl: string | TemplateRef<any>) {
    this.toasts.push({textOrTpl, classname: 'bg-success text-light', delay: 4000});
  }

  showDanger(textOrTpl: string | TemplateRef<any>) {
    this.toasts.push({textOrTpl, classname: 'bg-danger text-light', delay: 5000});
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
