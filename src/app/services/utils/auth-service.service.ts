/*import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  user: Observable<firebase.User>;
  constructor(
    public afAuth: AngularFireAuth
  ) {
    this.user = afAuth.authState;
  }

  /*Function for Firebase SignUp.
  This function should return the user FirebaseId.
  public signUpEmail(user) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(user.mail, user.password)
        .then(() => {
          resolve(this.getLogingUserId());
        }).catch(err => {
          reject(err);
        });
    });
  }

  public login(user) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(user.mail, user.password)
        .then(res => {
          resolve(res);
        }).catch(error => {
          reject(error);
        });
    });
  }

  public getLogingUser(): Promise<firebase.User> {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.onAuthStateChanged(function (user) {
        if (user) {
          resolve(user);
        } else {
          reject(undefined);
        }
      });
    });
  }

  public async getLogingUserId() {
    return await this.afAuth.auth.currentUser.uid;
  }

  public updatePassword(pass) {
    return new Promise((resolve, reject) => {
      const user = this.afAuth.auth.currentUser;
      user.updatePassword(pass)
        .then(function () {
          resolve();
        }).catch(err => {
          reject(err);
        });
    });
  }

  public sendVerificationEmail() {
    this.afAuth.auth.currentUser.sendEmailVerification()
      .catch(function (error) {
        console.log(`Erro: ${error}`);
      });
  }

  public deleteUser() {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.onAuthStateChanged(function (user) {
        if (user) {
          user.delete().then(() => {
            resolve();
          }).catch(err => {
            reject(err);
          });
        } else {
          reject();
        }
      });
    });
  }

  public logout() {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signOut()
        .then(() => {
          resolve();
        }).catch(err => {
          reject(err);
        });
    });
  }
}*/
