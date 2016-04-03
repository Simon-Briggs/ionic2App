import {App, IonicApp, Platform, MenuController} from 'ionic-angular';
import {TRANSLATE_PROVIDERS, TranslateService, TranslateLoader, TranslateStaticLoader, TranslatePipe, MissingTranslationHandler} from 'ng2-translate/ng2-translate';
import {provide} from "angular2/core";

import {StatusBar} from 'ionic-native';
import {LoginPage} from './pages/login/login';
import {HomePage} from './pages/home/home';
import {DetailsPage} from './pages/details/details';
import {QuizPage} from './pages/quiz/quiz';


@App({
	templateUrl: 'build/pages/sidebar/sidebar.html',
	config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
	pipes: [TranslatePipe],
	providers: [provide(MissingTranslationHandler, { useClass: MyMissingTranslationHandler })]
})
export class MyApp {
	rootPage: any = HomePage;
	app: any;
	menu: any;
	username : string;
	
	pages = [
		{ title: "Login Page", component: LoginPage },
		{ title: "Home Page", component: HomePage },
		{ title: "Details Page", component: DetailsPage },
		{ title: "Quiz Page", component: QuizPage }
	]

	constructor(menu: MenuController, platform: Platform, app: IonicApp) {
		this.menu = menu;
		
		var userLang = navigator.language.split('-')[0];
		//Define our list of supported languages:
		//userLang = /(de|en|hr)/gi.test(userLang) ? userLang : 'en';
		//translate.setDefaultLang('en');
		//translate.use(userLang);
		


		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			StatusBar.styleDefault();
			this.app = app;
			
			// Check if we've logged in before
			this.username = window.localStorage.getItem('email');
			if (this.username == null) {
				console.log("Not logged in");
				this.openPage(this.pages[0]);
			} else {
				console.log("Already logged in as " + this.username);
			}
		});
	}

	openPage(page) {
		this.menu.close();
		let nav = this.app.getComponent('nav');
		console.log("switching tab");
		nav.setRoot(page.component);
	}

}



export class MyMissingTranslationHandler implements MissingTranslationHandler {
	handle(key: string) {
		return 'some value';
	}
}
