import {LoginPage} from './pages/login/login';
import {HomePage} from './pages/home/home';
import {DetailsPage} from './pages/details/details';
import {QuizPage} from './pages/quiz/quiz';
import {PrioritiesPage} from './pages/priorities/priorities';

export class Constants {
    
	public static pages = [
		{ title: "Login Page", component: LoginPage },
		{ title: "Home Page", component: HomePage },
		{ title: "No back button", component: DetailsPage },
		{ title: "Quiz Page", component: QuizPage },
		{ title: "Priorities Page", component: PrioritiesPage },
		{ title: "Logout", component: LoginPage }
	]
    public static LoginPage = 0;
    public static HomePage = 1;
    public static DetailsPage = 2;
    public static QuizPage = 3;
    public static PrioritiesPage = 4;
    public static Logout = 5;
}