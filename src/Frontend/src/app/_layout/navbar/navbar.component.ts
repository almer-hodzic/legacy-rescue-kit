import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {AuthService} from '../../_auth/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(public auth: AuthService, private router: Router) {}

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }

  get username(): string | null {
    return this.auth.getUsername();
  }

  showDropdown = false;


  goToProfile(): void {
    this.router.navigate(['/profile']);
  }
  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }
}
