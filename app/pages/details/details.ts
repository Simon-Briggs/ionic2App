import {NavController, NavParams} from 'ionic-angular';
import {GitHubService} from '../../services/github';
import {Component} from '@angular/core';

@Component({
    templateUrl: 'build/pages/details/details.html',
    providers: [GitHubService]
})
export class DetailsPage {
    public readme = 'TODO:';
    public repo;

    constructor(private github: GitHubService,
        private nav: NavController,
        private navParams: NavParams) {

        this.repo = navParams.get('repo');


    }
}