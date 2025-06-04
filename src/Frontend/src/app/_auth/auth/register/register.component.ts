import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class RegisterComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private snackbar: MatSnackBar, private authService: AuthService) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.authService.register(this.form.value).subscribe({
        next: () => {
          this.snackbar.open('Registration successful 🎉', 'Dismiss', { duration: 3000 });
          this.router.navigate(['/auth/login']);
        },
        error: () => {
          this.snackbar.open('Registration failed. User may already exist.', 'Dismiss', { duration: 3000 });
        }
      });


    }
  }
}
