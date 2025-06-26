import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, switchMap, throwError, take } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class Http401Interceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private auth: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();

    const authReq = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.auth.refreshToken().pipe(
              switchMap((res) => {
                this.isRefreshing = false;
                this.refreshTokenSubject.next(res.accessToken);

                const newReq = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${res.accessToken}`
                  }
                });

                return next.handle(newReq);
              }),
              catchError((refreshError) => {
                this.isRefreshing = false;
                this.auth.logout();
                this.router.navigate(['/auth/login']);
                return throwError(() => refreshError);
              })
            );
          } else {
            return this.refreshTokenSubject.pipe(
              take(1),
              switchMap((token) => {
                const cloned = req.clone({
                  setHeaders: { Authorization: `Bearer ${token}` }
                });
                return next.handle(cloned);
              })
            );
          }
        }

        return throwError(() => error);
      })
    );
  }
}
