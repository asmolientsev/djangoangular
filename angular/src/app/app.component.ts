import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title }     from '@angular/platform-browser';

import { UserService } from './users/services/user.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styles: [`
  	.active {

  	}
  `],
})
export class AppComponent implements OnInit { 
	title = 'Blog'; 
	isAuth: boolean = false;
	loginSubscription: any;
	logoutSubscription: any;
	username: string;

	constructor(
		private userService: UserService,
		private router: Router,
		private titleService: Title
	){}

	ngOnInit() {
		this.titleService.setTitle(this.title);
		this.isAuth = this.userService.isLogIn();
		if (this.isAuth)
			this.username = this.userService.getUsername();
		this.loginSubscription = this.userService.getLoginEmmiter();
		this.loginSubscription.subscribe((name: string) => this.onLogin(name));
		this.logoutSubscription = this.userService.getLogoutEmmiter();
		this.logoutSubscription.subscribe(() => this.onLogout());
	}

	onLogin(name: string) {
		this.isAuth = true;	
		this.username = name;
	}

	onLogout() {
		this.isAuth = false;	
	}
}
