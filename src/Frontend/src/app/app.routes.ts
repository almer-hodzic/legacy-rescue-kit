import { Routes } from '@angular/router';
import {TaskListComponent} from './tasks/task-list/task-list.component';
import {TaskFormComponent} from './tasks/task-form/task-form.component';
import {LoginComponent} from './_auth/auth/login/login.component';
import {RegisterComponent} from './_auth/auth/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/new', component: TaskFormComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent }
];
