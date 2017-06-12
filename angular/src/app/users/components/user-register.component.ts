import { Component } from '@angular/core';


import { User } from '../entities/user';
import { UserService } from '../services/user.service';

export interface FormModel {
  captcha?: string;
}


@Component({
	selector: 'user-register',
	templateUrl: './user-register.component.html',
})
export class UserRegisterComponent {
	user: User;
	public formModel: FormModel = {};

	constructor(private userService: UserService) {
		this.user = new User;
	}

	onSubmit(): void {
		this.userService.create(this.user);
	}
}