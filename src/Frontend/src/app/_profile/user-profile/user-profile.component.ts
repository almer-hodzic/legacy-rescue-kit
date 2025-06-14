import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

interface UserMeDto {
  id: string;
  email: string;
  username: string;
  roles: string[];
}

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: UserMeDto | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<UserMeDto>('https://localhost:44348/api/auth/me').subscribe({
      next: (user) => (this.user = user)
    });
  }
}
