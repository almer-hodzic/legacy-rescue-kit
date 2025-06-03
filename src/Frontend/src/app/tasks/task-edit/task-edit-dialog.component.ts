import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { TaskItem, TaskUpdateRequest } from '../../_models/models/task.model';
import { TaskService } from '../task.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditDialogComponent {
  form: FormGroup;

  constructor(
      @Inject(MAT_DIALOG_DATA) public task: TaskItem,
      private dialogRef: MatDialogRef<TaskEditDialogComponent>,
      private taskService: TaskService,
      private snackbar: MatSnackBar,
      private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      title: [task.title, Validators.required],
      dueDate: [task.dueDate],
      isDone: [task.isDone]
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    const updated: TaskUpdateRequest = this.form.value;
    this.taskService.updateTask(this.task.id, updated).subscribe({
      next: () => {
        this.snackbar.open('Task updated!', 'Dismiss', { duration: 2000 });
        this.dialogRef.close(true); // emit success flag
      },
      error: () => {
        this.snackbar.open('Update failed', 'Dismiss', { duration: 3000 });
      }
    });
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}

