import { Injectable } from '@angular/core';
import { CanActivate, Router, NavigationStart } from '@angular/router';
import { FirebaseService } from './firebase.service';
import { Observable } from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthGuard implements CanActivate {
    loggedIn: boolean;

    constructor(private firebase: FirebaseService, private router: Router, private auth: AngularFireAuth) { }

    canActivate() {
        let status = (window.localStorage.getItem("cba_logged_in") == "true");
        
        if(!status) {
            this.router.navigate(['admin/login']);
        }

        return status;
    }
}