import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import {AuthService} from '../auth.service';
import { inject } from '@angular/core';

export function roleGuard(requiredRole: string): CanActivateFn {
  return () => {
    const authService = inject(AuthService);
    const token = authService.getToken();

    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload?.role === requiredRole;
    } catch {
      return false;
    }
  };
}
