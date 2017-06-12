import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Component({
	selector: 'user-logout',
	template: '',
})
export class UserLogoutComponent implements OnInit {
	
	constructor(
		private router: Router, 
		private userService: UserService) {
	}

	ngOnInit(): void {
		this.userService.logout();
		this.router.navigate(['']);
	}
}