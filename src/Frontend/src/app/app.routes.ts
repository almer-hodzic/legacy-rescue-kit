import { Routes } from '@angular/router';
import {TaskListComponent} from './tasks/task-list/task-list.component';
import {TaskFormComponent} from './tasks/task-form/task-form.component';
import {LoginComponent} from './_auth/auth/login/login.component';
import {RegisterComponent} from './_auth/auth/register/register.component';
import {UserProfileComponent} from './_profile/user-profile/user-profile.component';
import {roleGuard} from './_auth/auth/guards/role.guard';
import {AdminDashboardComponent} from './_admin/admin/admin-dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/new', component: TaskFormComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [roleGuard('Admin')] }
];
