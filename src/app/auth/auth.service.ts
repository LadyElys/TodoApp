import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private eventAuthError = new BehaviorSubject<string>('');
  eventAuthError$ = this.eventAuthError.asObservable();
  newUser: any;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {}

  createUser(user) {
    this.afAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
        this.newUser = user;

        userCredential.user.updateProfile({
          displayName: user.firstName + ' ' + user.lastName,
        });

        this.insertUserData(userCredential).then(() => {
          this.router.navigate(['/home']);
        });
      })
      .catch((error) => {
        this.eventAuthError.next(error);
      });
  }

  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      displayName: this.newUser.firstName + ' ' +this.newUser.lastName,
      password: this.newUser.password
    });
  }

  getUserState() {
    return this.afAuth.authState;
  }

  login(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        this.eventAuthError.next(error);
      })
      .then((userCredential) => {
        if (userCredential) {
          this.router.navigate(['/home']);
        }
      });
  }

  logout() {
    return this.afAuth.signOut();
  }
}
