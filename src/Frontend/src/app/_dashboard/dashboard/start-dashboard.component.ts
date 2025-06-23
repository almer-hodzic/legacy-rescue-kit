import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../_auth/auth/auth.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-start-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './start-dashboard.component.html',
  styleUrls: ['./start-dashboard.component.scss']
})
export class StartDashboardComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.auth.hasToken()) {
      const role = this.auth.getUserRole();
      if (role === 'Admin') this.router.navigate(['/admin']);
      else this.router.navigate(['/tasks']);
    }
  }
}
