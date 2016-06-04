import {Page, NavController} from 'ionic-angular';
import {Constants} from '../../constants';
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

	validateForm(): boolean {
		if (this.email.length < 1 || this.email.indexOf("@") < 0) {
			return false;
		}
		if (this.password.length < 1) {
			return false;
		}
		console.log("Form valid");
		return true;
	}

	signup(): void {
		if (!this.validateForm()) {
			return;
		}
		this.Firebase = require('firebase');
		var ref = new this.Firebase("https://shining-torch-2724.firebaseio.com");
		var _this = this;
		ref.createUser({
			email: this.email,
			password: this.password
		}, function (error, userData) {

			if (error) {
				console.log("Error creating user:", error);
			} else {
				console.log("Successfully created user account with uid:", userData);
			}
		});
	}


	// find a suitable name based on the meta info given by each provider
	public getName(authData): string {
		switch (authData.provider) {
			case 'password':
				return authData.password.email.replace(/@.*/, '');
			case 'twitter':
				return authData.twitter.displayName;
			case 'facebook':
				return authData.facebook.displayName;
		}
	}

	login(): void {
		if (!this.validateForm()) {
			return;
		}
		this.Firebase = require('firebase');
		var ref = new this.Firebase("https://shining-torch-2724.firebaseio.com");
		let email = this.email, password = this.password;
		var _this = this;
		ref.authWithPassword({
			email: email,
			password: password
		}, function (error, authData) {
			if (error) {
				switch (error.code) {
					case "INVALID_EMAIL":
						console.log("The specified user account email is invalid.");
						break;
					case "INVALID_PASSWORD":
						console.log("The specified user account password is incorrect.");
						break;
					case "INVALID_USER":
						console.log("The specified user account does not exist.");
						break;
					default:
						console.log("Error logging user in:", error);
				}
			} else {
				console.log("Authenticated successfully with payload:", authData);
				window.localStorage.setItem('email', email);
				window.localStorage.setItem('password', password);

				// save the user's profile into the database so we can list users,
				// use them in Security and Firebase Rules, and show profiles
				ref.child("users").child(authData.uid).set({
					provider: authData.provider,
					name: _this.getName(authData)
				});

				_this.nav.setRoot(Constants.pages[Constants.HomePage].component);
				_this.nav.popToRoot();
			}
		});
	}

	logout(): void {
		window.localStorage.removeItem('email');
		window.localStorage.removeItem('password');

		var ref = new this.Firebase("https://shining-torch-2724.firebaseio.com");
		ref.unauth();

		this.nav.setRoot(Constants.pages[Constants.LoginPage].component);
		this.nav.popToRoot();
		console.log("Logged out");
	}
}