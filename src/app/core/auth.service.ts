import {
  Injectable
} from '@angular/core';
import {
  Router
} from '@angular/router';

import * as firebase from 'firebase/app';
import {
  AngularFireAuth
} from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/observable/of';

interface User {
  uid: string;
  email: string;
  photoURL ?: string;
  displayName ?: string;
  role ?: string;
}

@Injectable()
export class AuthService {

  user: Observable < User > ;

  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {

    //// Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          return this.afs.doc < User > (`users/${user.uid}`).valueChanges()
        } else {
          return Observable.of(null)
        }
      })
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
        this.router.navigate(['/profile']);
      })
  }

  private updateUserData(user) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument < any > = this.afs.doc(`users/${user.uid}`);

    userRef.valueChanges().subscribe(resp => {
      if (resp) {
        console.log('Existing User');
      } else {
        const data: User = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: 'DEALER'
        }
        return userRef.set(data, {
          merge: true
        })
      }
    })
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
