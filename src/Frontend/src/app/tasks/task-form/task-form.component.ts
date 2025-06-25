import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { TaskCreateRequest, TaskItem, TaskUpdateRequest } from '../../_models/models/task.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-task-form',
  standalone: true,
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCheckboxModule
  ]
})
export class TaskFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  taskId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      dueDate: [null, pastDateValidator()],
      isDone: [false]
    });
  }

  get title() {
    return this.form.get('title');
  }

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!this.taskId;

    if (this.isEdit) {
      this.taskService.getTask(this.taskId!).subscribe({
        next: (task: TaskItem) => {
          this.form.patchValue({
            title: task.title,
            dueDate: task.dueDate,
            isDone: task.isDone
          });
        },
        error: () =>
          this.snackbar.open('Failed to load task', 'Dismiss', { duration: 3000 })
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.value;

    if (this.isEdit && this.taskId) {
      const updateReq: TaskUpdateRequest = {
        title: data.title,
        dueDate: data.dueDate,
        isDone: data.isDone
      };

      this.taskService.updateTask(this.taskId, updateReq).subscribe({
        next: () => {
          this.snackbar.open('Task updated ✅', 'Dismiss', { duration: 2000 });
          this.router.navigate(['/tasks']);
        },
        error: () => this.snackbar.open('Update failed ❌', 'Dismiss', { duration: 3000 })
      });
    } else {
      const createReq: TaskCreateRequest = {
        title: data.title,
        dueDate: data.dueDate
      };

      this.taskService.createTask(createReq).subscribe({
        next: () => {
          this.snackbar.open('Task created 🎉', 'Dismiss', { duration: 2000 });
          this.router.navigate(['/tasks']);
        },
        error: () => this.snackbar.open('Creation failed ❌', 'Dismiss', { duration: 3000 })
      });
    }
  }
}

function pastDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const selectedDate = new Date(control.value);
    const today = new Date();
    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return selectedDate < today ? { pastDate: true } : null;
  };
}

