import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../entities/user';
import { UserService } from '../services/user.service';

@Component({
	selector: 'user-login',
	templateUrl: './user-login.component.html',
})
export class UserLoginComponent {
	user: User;
	submitted: boolean = false;
	notAuth: boolean = false;

	constructor(
		private router: Router, 
		private userService: UserService) {
		this.user = new User;
	}

	onSubmit(): void {
		this.submitted = true;
		this.userService.auth(this.user)
			.then(success => {
				if (success) {
					this.router.navigate(['/topics']);
				} else {
					this.notAuth = true;
				}
			})
			.catch(error => this.notAuth = true);
	}
}