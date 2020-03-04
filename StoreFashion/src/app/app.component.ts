import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Store Fashion';

  @ViewChild('sidenav') sidenav: MatSidenav;

   reason = '';

   close(reason: string) {
     this.reason = reason;
     this.sidenav.close();
   }

   shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

   contactForm = new FormGroup({
     mailAddress: new FormControl(''),
     mailText: new FormControl(''),
   });

   onSubmit() {
     console.log('FORM ', this.contactForm.value);
   }

}
