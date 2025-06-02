export interface TaskCreateRequest {
  title: string;
  dueDate?: string | null;
}

export interface TaskUpdateRequest {
  title: string;
  isDone: boolean;
  dueDate?: string | null;
}

export interface TaskItem {
  id: string;
  title: string;
  isDone: boolean;
  dueDate: string | null;
}
