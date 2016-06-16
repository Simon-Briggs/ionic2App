import {ionicBootstrap, App, Platform, MenuController, NavController} from 'ionic-angular';
import {TRANSLATE_PROVIDERS, TranslateService, TranslateLoader, TranslateStaticLoader, TranslatePipe, MissingTranslationHandler} from 'ng2-translate/ng2-translate';
import {provide, Component} from "@angular/core";

import {StatusBar} from 'ionic-native';

import {Constants} from './constants';
import {MyFirebase} from './myfirebase';

@Component({
	templateUrl: 'build/pages/sidebar/sidebar.html',
	pipes: [TranslatePipe]
})
export class MyApp {
	rootPage: any = Constants.pages[Constants.HomePage].component;
	app: App;
	menu: MenuController;
	username : string;

	pages : Array<any> = Constants.pages;

	constructor(menu: MenuController, platform: Platform, app: App) {
		this.menu = menu;
		this.app = app;

		var userLang = navigator.language.split('-')[0];
		//Define our list of supported languages:
		//userLang = /(de|en|hr)/gi.test(userLang) ? userLang : 'en';
		//translate.setDefaultLang('en');
		//translate.use(userLang);
		


		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			StatusBar.styleDefault();

			// Check if we've logged in before
			this.username = window.localStorage.getItem('email');
			if (this.username == null) {
				console.log("Not logged in");
				this.openPage(Constants.pages[0]);
			} else {
				console.log("Already logged in as " + this.username);
			}
		});
	}

	openPage(page) {
		this.menu.close();
		console.log("opening page", page);
		if(page == "logout") {
			console.log("Logging out, then going to login page");
			
			window.localStorage.removeItem('email');
			window.localStorage.removeItem('password');
			
			var Firebase = require("firebase");
			var ref = new Firebase("https://shining-torch-2724.firebaseio.com");
			ref.unauth();
		}
		let nav = this.app.getRootNav();
		console.log("switching tab");
		nav.setRoot(page.component);
	}

}


// Pass the main app component as the first argument
// Pass any providers for your app in the second argument
// Set any config for your app as the third argument:
// http://ionicframework.com/docs/v2/api/config/Config/
ionicBootstrap(MyApp, [provide(MissingTranslationHandler, { useClass: MyMissingTranslationHandler })], {
  
});



export class MyMissingTranslationHandler implements MissingTranslationHandler {
	handle(key: string) {
		return 'some value';
	}
}
