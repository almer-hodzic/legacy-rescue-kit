import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { TaskItem } from '../../_models/models/task.model';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-detail-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDetailDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public task: TaskItem,
    private dialogRef: MatDialogRef<TaskDetailDialogComponent>,
    private router: Router
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  goToEdit(): void {
    this.close();
    this.router.navigate(['/tasks', this.task.id, 'edit']);
  }
}
