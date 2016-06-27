import {Page, Loading, NavController} from 'ionic-angular';
import {Component} from '@angular/core';
import {Constants} from '../../constants';
import {MyFirebase} from '../../myFirebase';

@Component({
	templateUrl: 'build/pages/login/login.html',
	providers: []
})
export class LoginPage {
	public email: string = "";
	public password: string = "";
	public isLoading: boolean = false; //Used to animate when we are attempting a login
	public errorMessage: string = "";
	public successMessage: string = "";
	public Firebase;

	constructor(private nav: NavController) {
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
		this.errorMessage = "";
		if (!this.validateForm()) {
			this.errorMessage = "Username or password invalid";
			return;
		}

		let loading = Loading.create({
			content: 'Signing up...'
		});
		this.nav.present(loading);
		var ref = MyFirebase.auth;
		var _this = this;
		ref.createUserWithEmailAndPassword(this.email, this.password).then(function (userData) {

			loading.dismiss();
			console.log("Successfully created user account with uid:", userData);
			_this.errorMessage = "";
			_this.successMessage = "Account created!!";

			var db = MyFirebase.database;
			db.ref("users/" + userData.uid).set({
				accountCreated: Date.now()
			}).then(function(success){
				console.log("success", success);
			}, function(fail) {
				console.log("fail", fail);
			});
		}, function (error) {
			loading.dismiss();
			console.log("Error creating user:", error);
			_this.errorMessage = "Error creating user: " + error;
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

		let loading = Loading.create({
			content: 'Logging in...'
		});
		this.nav.present(loading);

		console.log("logging in...");
		this.isLoading = true;

		var ref = MyFirebase.auth;
		let email = this.email, password = this.password;
		var _this = this;

		ref.signInWithEmailAndPassword(email, password).then(function (authData) {
			loading.dismiss();
			console.log("Authenticated successfully with payload:", authData);
			_this.errorMessage = "";

			//TODO: Toasts here.

			window.localStorage.setItem('email', email);
			window.localStorage.setItem('password', password);

			// save the user's profile into the database so we can list users,
			// use them in Security and Firebase Rules, and show profiles
			var db = MyFirebase.database;
			//db.ref("users/").once(authData.uid);

			db.ref("users/" + authData.uid).set({
				lastLogin: Date.now(),
				serverLastLogin: MyFirebase._firebase.database.ServerValue.TIMESTAMP
			}).then(function(success){
				console.log("success", success);
			}, function(fail) {
				console.log("fail", fail);
			});

			_this.nav.setRoot(Constants.pages[Constants.HomePage].component);
			_this.nav.popToRoot();
		}, function (error) {
			console.log("caught excetion", error);
			loading.dismiss();
			_this.errorMessage = error.message;
		});
	}

	logout(): void {
		window.localStorage.removeItem('email');
		window.localStorage.removeItem('password');

		var ref = MyFirebase.auth;
		ref.signOut().then(function () {
			console.log("Signed out");
		}, function (error) {
			console.log("error signing out");
		});

		//this.nav.setRoot(Constants.pages[Constants.LoginPage].component);
		this.nav.popToRoot();
		console.log("Logged out");
		this.successMessage = "Logged out";
	}
}