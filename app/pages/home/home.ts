import {Page, NavController} from 'ionic-angular';  
import {Http} from 'angular2/http';

import {GitHubService} from '../../services/github';
@Page({
	templateUrl: 'build/pages/home/home.html',
	providers: [GitHubService]
})
export class HomePage {  
	public foundRepos;
	public username;
	public Firebase;

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
	
	getData () {
		this.Firebase = require('firebase');
		var ref = new this.Firebase("https://shining-torch-2724.firebaseio.com/web/data");
		
		// Attach an asynchronous callback to read the data at our posts reference
		ref.on("value", function(snapshot) {
		console.log(snapshot.val());
		}, function (errorObject) {
		console.log("The read failed: " + errorObject.code);
		});
		
		
		var child = ref.child("test");
		child.set({
			test : "this is a set test"
		});
		child.update({
			test : "this is an update test"
		}, function(error) {
			if (error) {
				console.log("error" , error);
			} else {
				console.log("success setting db");	
			}
		});
		var key = child.push({
			unique: "Wrappede by a unique key"
		}).key();
		console.log("unique key " , key);
		var transRef = ref.child("transaction");
		transRef.transaction(function (current_value) {
			return (current_value || 0) + 1;
		});
	}
	
	getFirebaseSaveFile() {
		this.http.get("https://shining-torch-2724.firebaseio.com/web/data")
			.map ( res => res.text())
			.subscribe (
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
}