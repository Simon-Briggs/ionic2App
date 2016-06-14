import {Page, NavController, NavParams} from 'ionic-angular';
import {Constants} from '../../constants';

@Page({
    templateUrl: 'build/pages/quiz/quiz.html',
    providers: []
})
export class QuizPage {
    public readme = 'Thie test will give you a rating on the likelihood of **. Complete the following:';

	public Firebase;
    public toppings;
    public rating;
    public questions = [
        "Q1: Rate a",
        "Q2: Rate b",
        "Q3: Rate c",
        "Q4: Rate d",
    ]
    public answers = [];

    constructor(private nav: NavController,
        private navParams: NavParams) {

    }

    submitForm() {
        console.log("Answers", this.answers);
        //submit results to firebase, then go back to homepage


        this.Firebase = require('firebase');
        var ref = new this.Firebase("https://shining-torch-2724.firebaseio.com/web/data");


        var child = ref.child("ref");
        child.set({
            key: "answers"
        });

        this.nav.setRoot(Constants.pages[Constants.HomePage].component);
        this.nav.popToRoot();

    }

    onChange() {
        return;
    }

    goBack() {
        this.nav.pop();
    }
}