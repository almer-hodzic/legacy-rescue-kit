import { Routes } from '@angular/router';
import {TaskListComponent} from './tasks/task-list/task-list.component';
import {TaskFormComponent} from './tasks/task-form/task-form.component';
import {LoginComponent} from './_auth/auth/login/login.component';
import {RegisterComponent} from './_auth/auth/register/register.component';
import {UserProfileComponent} from './_profile/user-profile/user-profile.component';
import {roleGuard} from './_auth/auth/guards/role.guard';
import {AdminDashboardComponent} from './_admin/admin/components/dashboard/admin-dashboard.component';
import {AdminUsersComponent} from './_admin/admin/components/admin-users/admin-users.component';
import {AdminTasksComponent} from './_admin/admin/components/tasks/admin-tasks.component';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/new', component: TaskFormComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [roleGuard('Admin')] },
  { path: 'admin/users', component: AdminUsersComponent, canActivate: [roleGuard('Admin')] },
  { path: 'admin/tasks', component: AdminTasksComponent, canActivate: [roleGuard('Admin')] }
];
