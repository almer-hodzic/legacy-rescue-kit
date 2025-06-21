import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService, TaskAdminDto } from '../../admin.service';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-admin-tasks',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './admin-tasks.component.html',
  styleUrls: ['./admin-tasks.component.scss']
})
export class AdminTasksComponent implements OnInit {
  tasks: TaskAdminDto[] = [];
  displayedColumns = ['title', 'dueDate', 'isDone', 'user'];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAllTasks().subscribe({
      next: (tasks) => (this.tasks = tasks)
    });
  }
}
