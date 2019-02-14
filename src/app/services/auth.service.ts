import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../classes/user';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';

// esto es un servicio
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public currentUser: Observable<User | null>;

  constructor(
    private router: Router,
    private alertService: AlertService
  ) {
    // TODO feth usr 
    this.currentUser = of(null);
  }

  public signup(firstName: string, lastName: string, email: string, password: string): Observable<boolean> { //los dos puntos es lo q devuelve
    // TODO fetch with firebase function
    return of(true);
  }

  public login(email: string, password: string): Observable<boolean> {
    // TODO fetch with firebase function
    return of(true);

  }

  public logout(): void {
    // al pulsar sobre logout ira a la login y saltara el msj
    // TODO fetch with firebase function
    this.router.navigate(['/login']);
    this.alertService.alerts.next(new Alert('You have been signed out'));


  }
}
