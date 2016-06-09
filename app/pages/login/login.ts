import {Page, NavController} from 'ionic-angular';
import {Constants} from '../../constants';
@Page({
	templateUrl: 'build/pages/login/login.html',
	providers: []
})
export class LoginPage {
	public email : string = "";
	public password : string = "";
	public isLoading : boolean = false; //Used to animate when we are attempting a login
	public errorMessage : string = "";
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
				_this.errorMessage = "Error creating user: " + error;
			} else {
				console.log("Successfully created user account with uid:", userData);
				_this.errorMessage = "";
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
			console.log("form invalid");
			this.errorMessage = "Username or password invalid";			
			return;
		}
		console.log("logging in...");
		this.isLoading = true;
		
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
						_this.errorMessage = "The specified user account email is invalid";
						break;
					case "INVALID_PASSWORD":
						console.log("The specified user account password is incorrect.");
						_this.errorMessage = "The specified user account password is incorrect";
						break;
					case "INVALID_USER":
						console.log("The specified user account does not exist.");
						_this.errorMessage = "The specified user account does not exist";
						break;
					default:
						console.log("Error logging user in:", error);
						_this.errorMessage = "Error logging in: " + error;
				}
			} else {
				console.log("Authenticated successfully with payload:", authData);
				_this.errorMessage = "";
				
				//TODO: Toasts here.
				
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