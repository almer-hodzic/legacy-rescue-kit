import { Component } from '@angular/core';
import {LayoutComponent} from './_layout/layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent],
  template: '<app-layout></app-layout>',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'legacy-kit-ui';
}
