import { Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../task.service';
import { TaskItem } from '../../_models/models/task.model';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskDetailDialogComponent } from '../task-dialog/task-dialog.component';
import {TaskEditDialogComponent} from "../task-edit/task-edit-dialog.component";
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    TaskDetailDialogComponent,
    MatPaginatorModule,
    MatTabsModule
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: TaskItem[] = [];
  loading = false;

  page = 1;
  pageSize = 5;
  totalCount = 0;
  statusFilter: 'all' | 'done' | 'pending' = 'all';


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private taskService: TaskService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;

    const query = {
      page: this.page,
      pageSize: this.pageSize,
      status: this.statusFilter !== 'all' ? this.statusFilter : undefined,
      sortBy: 'dueDate'
    };

    this.taskService.getTasks(query).subscribe({
      next: (res) => {
        this.tasks = res.body ?? [];
        const header = res.headers.get('X-Total-Count');
        this.totalCount = header ? parseInt(header, 10) : 0;
      },
      error: () => this.snackbar.open('Failed to load tasks', 'Dismiss', { duration: 3000 }),
      complete: () => (this.loading = false)
    });
  }


  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadTasks();
  }

  onTabChange(index: number): void {
    this.statusFilter = index === 1 ? 'done' : index === 2 ? 'pending' : 'all';
    this.page = 1;
    this.loadTasks();
  }

  deleteTask(id: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.snackbar.open('Task deleted', 'Dismiss', { duration: 2000 });
          this.loadTasks();
        },
        error: () => this.snackbar.open('Delete failed', 'Dismiss', { duration: 3000 })
      });
    }
  }

  openDetailDialog(task: TaskItem): void {
    this.dialog.open(TaskDetailDialogComponent, {
      width: '400px',
      data: task
    });
  }

  openEditDialog(task: TaskItem): void {
    const ref = this.dialog.open(TaskEditDialogComponent, {
      width: '450px',
      data: task
    });

    ref.afterClosed().subscribe((updated) => {
      if (updated) this.loadTasks();
    });
  }

}


