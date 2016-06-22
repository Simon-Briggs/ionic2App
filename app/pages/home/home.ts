import {NavController} from 'ionic-angular';
import {Http} from '@angular/http';
import {Component} from '@angular/core';
import {Control, Validators, FORM_PROVIDERS, FORM_DIRECTIVES, NgClass, CORE_DIRECTIVES} from '@angular/common';
import '../../../node_modules/chart.js/dist/Chart.bundle.min.js';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
//var Chart = require('chart.js/src/chart');


import {GitHubService} from '../../services/github';
@Component({
	templateUrl: 'build/pages/home/home.html',
	providers: [FORM_PROVIDERS, GitHubService],
	directives: [FORM_DIRECTIVES, CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES]
})
export class HomePage {
	public foundRepos;
	public username: string;
	public range: number;
	public Firebase;
	public rangeCtrl = new Control('3', Validators.maxLength(1));




	public lineChartData: Array<any> = [
		{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
		{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
		{ data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
	];
	public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
	public lineChartOptions: any = {
		animation: false,
		responsive: true
	};
	public lineChartColours: Array<any> = [
		{ // grey
			backgroundColor: 'rgba(148,159,177,0.2)',
			borderColor: 'rgba(148,159,177,1)',
			pointBackgroundColor: 'rgba(148,159,177,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(148,159,177,0.8)'
		},
		{ // dark grey
			backgroundColor: 'rgba(77,83,96,0.2)',
			borderColor: 'rgba(77,83,96,1)',
			pointBackgroundColor: 'rgba(77,83,96,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(77,83,96,1)'
		},
		{ // grey
			backgroundColor: 'rgba(148,159,177,0.2)',
			borderColor: 'rgba(148,159,177,1)',
			pointBackgroundColor: 'rgba(148,159,177,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(148,159,177,0.8)'
		}
	];
	public lineChartLegend: boolean = true;
	public lineChartType: string = 'line';






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