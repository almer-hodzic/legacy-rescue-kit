import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment.prod';

export interface UserAdminDto {
  id: string;
  userName: string;
  email: string;
  registeredAt: string;
  roles: string[];
}

export interface TaskAdminDto {
  id: string;
  title: string;
  isDone: boolean;
  dueDate: string | null;
  userEmail: string;
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UserAdminDto[]> {
    return this.http.get<UserAdminDto[]>(`${this.baseUrl}/users`);
  }

  changeUserRole(userId: string, role: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/users/${userId}/role`, { role });
  }

  getAllTasks(): Observable<TaskAdminDto[]> {
    return this.http.get<TaskAdminDto[]>(`${this.baseUrl}/tasks`);
  }
}
