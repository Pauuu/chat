import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { User } from '../classes/user';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { Alert } from '../classes/alert';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';





// esto es un servicio
@Injectable()
export class AuthService {

  public currentUser: Observable<User | null>;


  constructor(
    private router: Router,
    private alertService: AlertService,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {
    // Fetch the user from the Firebase backend, then set the user
    this.currentUser = this.afAuth.authState.pipe(switchMap((user) => {
      if (user) {
        return this.db.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    }))
  }

  public signup(firstName: string, lastName: string, email: string, password: string): Observable<boolean> {
    //Firebase create a user with email And password
    return from(
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
          const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.user.uid}`);
          const updatedUser = {
            id: user.user.uid,
            email: user.user.email,
            firstName,
            lastName,
            photoUrl: 'https://firebasestorage.googleapis.com/v0/b/chat-cd9f2.appspot.com/o/default_profile_pic.jpg?alt=media&token=6a5a3898-decb-4217-bb49-907c87e9be6d'
          }
          userRef.set(updatedUser);
          return true;
        })
        .catch((err) => false)
    );
  }


  // verifica si el login es correcto o no
  public login(email: string, password: string): Observable<boolean> {
    //Firebase login function
    return from(
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((user) => true)
        .catch((err) => false)
    );
  }


  public logout(): void {
    // al pulsar sobre logout ira a la login y saltara el msj
    // TODO fetch with firebase function
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
      this.alertService.alerts.next(new Alert('You have been signed out'));
    });
  }
}
