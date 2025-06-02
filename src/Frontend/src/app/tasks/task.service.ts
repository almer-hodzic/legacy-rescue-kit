import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TaskItem {
  id: string;
  title: string;
  isDone: boolean;
  dueDate: string | null;
}

export interface TaskCreateRequest {
  title: string;
  dueDate?: string | null;
}

export interface TaskUpdateRequest {
  title: string;
  isDone: boolean;
  dueDate?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // Update URL prema tvojoj konfiguraciji backend servera
  private apiUrl = 'https://localhost:44348/api/Task';

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(this.apiUrl);
  }

  getTask(id: string): Observable<TaskItem> {
    return this.http.get<TaskItem>(`${this.apiUrl}/${id}`);
  }

  createTask(task: TaskCreateRequest): Observable<TaskItem> {
    return this.http.post<TaskItem>(this.apiUrl, task);
  }

  updateTask(id: string, task: TaskUpdateRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
