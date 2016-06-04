import {Page, NavController, NavParams} from 'ionic-angular';

@Page({
    templateUrl: 'build/pages/quiz/quiz.html',
    providers: []
})
export class QuizPage {
    public readme = 'Thie test will give you a rating on the likelihood of **. Complete the following:';
    
    public toppings;
    public rating;


    constructor(private nav: NavController,
        private navParams: NavParams) {

    }
    goBack() {
        this.nav.pop();
    }
}