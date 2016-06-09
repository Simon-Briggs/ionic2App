import {LoginPage} from './pages/login/login';
import {HomePage} from './pages/home/home';
import {DetailsPage} from './pages/details/details';
import {QuizPage} from './pages/quiz/quiz';

export class Constants {
    
	public static pages = [
		{ title: "Login Page", component: LoginPage },
		{ title: "Home Page", component: HomePage },
		{ title: "Details Page", component: DetailsPage },
		{ title: "Quiz Page", component: QuizPage },
		{ title: "Logout", component: LoginPage }
	]
    public static LoginPage = 0;
    public static HomePage = 1;
    public static DetailsPage = 2;
    public static QuizPage = 3;
    public static Logout = 4;
}