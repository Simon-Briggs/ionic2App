import {NavController, NavParams} from 'ionic-angular';
import {Component} from '@angular/core';
import {Constants} from '../../constants';

@Component({
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
    public questionCount;
    public answers = [];

    constructor(private nav: NavController,
        private navParams: NavParams) {
        this.questionCount = Array(this.questions.length).fill().map((x, i) => i);

    }

    submitForm() {
        console.log("Answers", this.answers);
        var total = 0;
        for (var i in this.answers) {
            total += parseInt(this.answers[i]);
        }
        //submit results to firebase, then go back to homepage


        this.Firebase = require('firebase');
        var ref = new this.Firebase("https://shining-torch-2724.firebaseio.com/web/data");


        var child = ref.child("ref");
        var key = Date.now();
        console.log(total, key);
        child.set({
            [key]: total
        });

        this.nav.setRoot(Constants.pages[Constants.HomePage].component);

    }

    onChange() {
        return;
    }

    goBack() {
        this.nav.pop();
    }
}