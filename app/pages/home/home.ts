import {NavController} from 'ionic-angular';
import {Http} from '@angular/http';
import {Component} from '@angular/core';
import {Control, Validators, FORM_PROVIDERS, FORM_DIRECTIVES, NgClass, CORE_DIRECTIVES} from '@angular/common';
import '../../../node_modules/chart.js/dist/Chart.bundle.min.js';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
import {MyFirebase} from '../../myFirebase';
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
		var ref = MyFirebase.database.ref("/");;
		// Attach an asynchronous callback to read the data at our posts reference
		ref.once("value", function (snapshot) {
			console.log(snapshot.val());
		}, function (errorObject) {
			console.log("The read failed: " + errorObject.code);
		});

		// Create a callback which logs the current auth state
		function authDataCallback(user) {
			if (user) {
				// User signed in!
				var uid = user.uid;
			} else {
				// User logged out
			}
		}
		// Register the callback to be fired every time auth state changes]
		var auth = MyFirebase.auth;
		auth.onAuthStateChanged(authDataCallback);

		var authData = auth.currentUser;
		if (authData) {
			console.log("User is logged in", authData);
		} else {
			console.log("User is logged out");
		}
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