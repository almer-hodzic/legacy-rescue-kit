import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import {environment} from '../../../environments/environment.prod';

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UpdateProfileRequest {
  email: string;
  username: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}


export interface UserMeDto {
  id: string;
  email: string;
  userName: string;
  roles: string[];
}



@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environment.apiBaseUrl;
  private tokenKey = 'jwt_token';
  isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  login(data: LoginRequest): Observable<any> {
    return this.http.post<{ accessToken: string; refreshToken: string }>(`${this.baseUrl}/login`, data).pipe(
      tap((res) => {
        localStorage.setItem(this.tokenKey, res.accessToken);
        this.isLoggedIn$.next(true);
      })
    );
  }


  logout(): void {
    this.http.post(`${this.baseUrl}/logout`, {}, { withCredentials: true }).subscribe({
      complete: () => {
        localStorage.removeItem(this.tokenKey);
        this.isLoggedIn$.next(false);
      },
      error: () => {
        // fallback ako backend ne radi — i dalje logoutaj
        localStorage.removeItem(this.tokenKey);
        this.isLoggedIn$.next(false);
      }
    });
  }


  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getUsername(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('decoded payload:', payload);
      return payload?.unique_name ?? null;
    } catch {
      return null;
    }
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload?.role ?? null;
    } catch {
      return null;
    }
  }


  getCurrentUser(): Observable<UserMeDto> {
    return this.http.get<UserMeDto>(`${this.baseUrl}/me`);
  }


  updateProfile(data: UpdateProfileRequest): Observable<any> {
    return this.http.put(`${this.baseUrl}/profile`, data);
  }

  changePassword(data: ChangePasswordRequest): Observable<any> {
    return this.http.put(`${this.baseUrl}/change-password`, data);
  }

  refreshToken(): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(`${this.baseUrl}/refresh`, {}, { withCredentials: true }).pipe(
      tap((res) => {
        localStorage.setItem(this.tokenKey, res.accessToken);
      })
    );
  }

}
