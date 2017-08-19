import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class FirebaseService {
    private loggedIn = false;
    private userID = null;

    private menus = [];
    private items = [];

    private subscriptions = [];

    constructor(private database: AngularFireDatabase, private auth: AngularFireAuth) {
        this.auth.authState.subscribe(result => {
            if(result) {
                this.userID = result.uid;
                this.loggedIn = true;

                let menusSubscription = this.database.list('menus').subscribe(result => this.menus = result);
                let itemsSubscription = this.database.list('items').subscribe(result => this.items = result);

                this.subscriptions.push(menusSubscription);
                this.subscriptions.push(itemsSubscription);
            } else {
                while(this.subscriptions.length > 0) {
                    let subscription = this.subscriptions.pop();
                    subscription.unsubscribe();
                }
                this.loggedIn = false;
                this.userID = null;
            }
        });
    }

    getloginStatus() {
        return Observable.interval(250).map(() => {
            return new Object({
                loggedIn: this.loggedIn,
                UID: this.userID
            });
        });
    }

    signIn(credentials) {
        this.auth.auth.signInWithEmailAndPassword(credentials.username, credentials.password)
            .catch((error) => {
                alert("Could not log in!");
            });
    }

    signOut() {
        this.auth.auth.signOut();
        this.loggedIn = false;
        this.userID = null;
    }

    getMenus() {
        return Observable.interval(250).map(() => this.menus).distinctUntilChanged();
    }

    getItems() {
        return Observable.interval(250).map(() => this.items).distinctUntilChanged();
    }

    getItem(key) {
        return this.database.object('items/' + key).take(1);
    }

    getMenu(key) {
        return this.database.object('menus/' + key).take(1);
    }

    addMenu(menu) {
        this.database.list('menus').push(menu);
    }

    addItem(item) {
        this.database.list('items').push(item);
    }

    updateItem(key, item) {
        this.database.object('items/' + key).update(item);
    }

    updateMenu(key, menu) {
        this.database.object('menus/' + key).update(menu);
    }

    removeItem(key) {
        this.database.object('items/' + key).remove();
    }

    removeMenu(key) {
        this.database.object('menus/' + key).remove();
    }
}