import {Page, NavController} from 'ionic-angular';
import {Http} from 'angular2/http';
//import {Control} from 'angular2/core';
import {Control, Validators, FORM_PROVIDERS, FORM_DIRECTIVES} from 'angular2/common';

import {GitHubService} from '../../services/github';
@Page({
	templateUrl: 'build/pages/home/home.html',
	providers: [FORM_PROVIDERS, GitHubService],
	directives: [FORM_DIRECTIVES]
})
export class HomePage {
	public foundRepos;
	public username: string;
	public range;
	public Firebase;
	public rangeCtrl = new Control('3', Validators.maxLength(1));

	constructor(private github: GitHubService, private nav: NavController, private http: Http) {
		console.log("username:", this.username);
		this.getData();
	}

	getRepos() {
		this.github.getRepos(this.username).subscribe(
			data => {
				this.foundRepos = data.json();
			},
			err => console.error(err),
			() => console.log('getRepos completed')
		);
	}

	goToDetails(repo) {
        console.log("going to details");
	}

	getData() {
		this.Firebase = require('firebase');
		var ref = new this.Firebase("https://shining-torch-2724.firebaseio.com/web/data");

		// Attach an asynchronous callback to read the data at our posts reference
		ref.on("value", function (snapshot) {
			console.log(snapshot.val());
		}, function (errorObject) {
			console.log("The read failed: " + errorObject.code);
		});

		// Attach an asynchronous callback to read the data at our posts reference
		ref.once("value", function (snapshot) {
			console.log(snapshot.val());
		}, function (errorObject) {
			console.log("The read failed: " + errorObject.code);
		});

		// Retrieve new posts as they are added to our database
		ref.on("child_added", function (snapshot, prevChildKey) {
			var newPost = snapshot.val();
			console.log("Snapshot.val: ", newPost);
		});

		var child = ref.child("test");
		child.set({
			test: "this is a set test"
		});
		child.update({
			test: "this is an update test"
		}, function (error) {
			if (error) {
				console.log("error", error);
			} else {
				console.log("success setting db");
			}
		});
		var key = child.push({
			unique: "Wrapped by a unique key"
		}).key();
		console.log("unique key ", key);
		var transRef = ref.child("transaction");
		transRef.transaction(function (current_value) {
			return (current_value || 0) + 1;
		});

		// Create a callback which logs the current auth state
		function authDataCallback(authData) {
			if (authData) {
				console.log("User " + authData.uid + " is logged in with " + authData.provider);
			} else {
				console.log("User is logged out");
			}
		}
		// Register the callback to be fi#red every time auth state changes]
		ref.onAuth(authDataCallback);

		var authData = ref.getAuth();
		if (authData) {
			console.log("User " + authData.uid + " is logged in with " + authData.provider);
		} else {
			console.log("User is logged out");
		}

		var presenceRef = new this.Firebase('shining-torch-2724.firebaseio.com/disconnectmessage');
		// Write a string when this client loses connection
		presenceRef.onDisconnect().set("I disconnected!");

		// Remove our disconnect sensor when we close the app gracefully
		presenceRef.onDisconnect().remove(function (err) {
			if (err) {
				console.error('could not establish onDisconnect event', err);
			}
		});
	}

	getFirebaseSaveFile() {
		this.http.get("https://shining-torch-2724.firebaseio.com/web/data")
			.map(res => res.text())
			.subscribe(
			data => {
				console.log(data);
			},
			err => {
				console.log(err);
			},
			() => {
				console.log("firebase connection complete");
			}
			);

	}

	onChange() {
		console.log("Range Changed", this.range);
	}
}