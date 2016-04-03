import {Page, NavController} from 'ionic-angular';

@Page({
    templateUrl: 'build/pages/login/login.html',
    providers: []
})
export class LoginPage {
    public email;
    public password;
    public Firebase;

    constructor(private nav: NavController) {
         this.Firebase = require('firebase');
    }

    validateForm () : boolean {
        if (this.email.length < 1 || this.email.indexOf("@") < 0 ) {
            return false;
        }
        if (this.password.length < 1) {
            return false;
        }
        console.log("Form valid");
        return true;
    }

    signup() {
        if(!this.validateForm()) {
            return;
        }
         this.Firebase = require('firebase');
        var ref = new this.Firebase("https://shining-torch-2724.firebaseio.com");
        ref.createUser({
            email: this.email,
            password: this.password
        }, function(error, userData) {
            if (error) {
                console.log("Error creating user:", error);
            } else {
                console.log("Successfully created user account with uid:", userData.uid);
            }
        });
    }

    login() {
        if(!this.validateForm()) {
            return;
        }
        this.Firebase = require('firebase');
        var ref = new this.Firebase("https://shining-torch-2724.firebaseio.com");
        let email = this.email, password = this.password;
        ref.authWithPassword({
            email: email,
            password: password
        }, function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                window.localStorage.setItem('email', email);
                window.localStorage.setItem('password', password);
            }
        });
    }
}