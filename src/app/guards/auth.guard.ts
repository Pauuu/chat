import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

// to implement all the security
import { map, take, tap } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { Alert } from '../classes/alert';
import { AlertType } from './../enum/alert-type.enum';
import { AuthService } from '../services/auth.service';

@Injectable(/*{
  providedIn: 'root'
}*/)
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertService: AlertService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

    return this.auth.currentUser.pipe(
      take(1),
      map((currentUser) => !!currentUser), //casteo a boolean
      tap((loggedIn) => {
        if (!loggedIn) {
          this.alertService.alerts.next(new Alert('You must be logged in to access that page.', AlertType.Danger));
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        }
      })
    )
  }
}
