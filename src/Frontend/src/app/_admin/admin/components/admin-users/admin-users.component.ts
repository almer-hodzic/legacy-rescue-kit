import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService, UserAdminDto } from '../../admin.service';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  users: UserAdminDto[] = [];
  roles = ['Admin', 'User'];
  displayedColumns = ['username', 'email', 'roles', 'actions'];

  constructor(private adminService: AdminService, private snackbar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.adminService.getAllUsers().subscribe({
      next: (users) => (this.users = users),
    });
  }

  onRoleChange(user: UserAdminDto, newRole: string): void {
    this.adminService.changeUserRole(user.id, newRole).subscribe({
      next: () => {
        this.snackbar.open('Role updated', 'Dismiss', { duration: 2000 });
        this.loadUsers();
      },
    });
  }
}
