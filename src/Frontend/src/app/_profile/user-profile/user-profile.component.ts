import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {AuthService} from '../../_auth/auth/auth.service';

interface UserMeDto {
  id: string;
  email: string;
  userName: string;
  roles: string[];
}

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule,
    MatButtonModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: UserMeDto | null = null;
  profileForm!: FormGroup;
  passwordForm!: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder, private snackbar: MatSnackBar, private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
        this.profileForm = this.fb.group({
          email: [user.email],
          userName: [user.userName]
        });

        this.passwordForm = this.fb.group({
          currentPassword: [''],
          newPassword: ['']
        });
      }
    });
  }

  updateProfile(): void {
    if (this.profileForm.invalid) return;

    this.auth.updateProfile(this.profileForm.value).subscribe({
      next: () => this.snackbar.open('Profile updated ✔️', 'Dismiss', { duration: 3000 }),
      error: () => this.snackbar.open('Update failed ❌', 'Dismiss', { duration: 3000 })
    });
  }

  changePassword(): void {
    if (this.passwordForm.invalid) return;

    this.auth.changePassword(this.passwordForm.value)
      .subscribe({
      next: () => this.snackbar.open('Password changed 🔐', 'Dismiss', { duration: 3000 }),
      error: () => this.snackbar.open('Password change failed ❌', 'Dismiss', { duration: 3000 })
    });
  }
}
