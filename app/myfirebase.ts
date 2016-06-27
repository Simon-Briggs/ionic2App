// Keep our 1 instance of Firebase here
export class MyFirebase {

	public static _firebase = require('firebase/app');
	public static _auth = require('firebase/auth');
	public static _database = require('firebase/database');
	public static _storage = require('firebase/storage');


	// Initialize Firebase
	public static config = {
		apiKey: "AIzaSyCbd1ZGGsFaz0ffK8ty8_jnawvukye738A",
		authDomain: "shining-torch-2724.firebaseapp.com",
		databaseURL: "https://shining-torch-2724.firebaseio.com",
		storageBucket: "shining-torch-2724.appspot.com",
	};

	public static init = MyFirebase._firebase.initializeApp(MyFirebase.config);
	public static storage = MyFirebase._firebase.storage();
	public static database = MyFirebase._firebase.database();
	public static rootRef = MyFirebase._firebase.database().ref();
	public static auth = MyFirebase._firebase.auth();

}