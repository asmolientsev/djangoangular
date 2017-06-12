import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule }    from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

import { UserService } from './services/user.service';
import { UserRegisterComponent } from './components/user-register.component';
import { UserLoginComponent } from './components/user-login.component';
import { UserLogoutComponent } from './components/user-logout.component';
import { UserRoutingModule } from './user.routing';

@NgModule({
	imports: [
		CommonModule,
		HttpModule,
		FormsModule,
		UserRoutingModule,
		RecaptchaModule.forRoot(),
		RecaptchaFormsModule,
	],
	declarations: [
		UserRegisterComponent,
		UserLoginComponent,
		UserLogoutComponent
	],
	providers: [ UserService ],
})
export class UserModule { }
