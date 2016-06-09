export class MyFirebase {
    
	public static Firebase = require("firebase");
    public static ref = new MyFirebase.Firebase("https://shining-torch-2724.firebaseio.com");
	// Keep our 1 instance of Firebase here
}