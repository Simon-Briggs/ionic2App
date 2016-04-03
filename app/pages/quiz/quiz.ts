import {Page, NavController, NavParams} from 'ionic-angular';  

@Page({
    templateUrl: 'build/pages/quiz/quiz.html',
    providers: []
})
export class QuizPage {  
    public readme = 'asdfasdfasdfasdsf';

    constructor(private nav: NavController, 
                private navParams: NavParams) {

    }
    goBack() {
        this.nav.pop();
    }
}