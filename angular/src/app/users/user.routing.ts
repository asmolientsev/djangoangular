import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserLoginComponent } from './components/user-login.component';
import { UserLogoutComponent } from './components/user-logout.component';
import { UserRegisterComponent } from './components/user-register.component';

const userRoutes: Routes = [
	{ path: 'login', component: UserLoginComponent },
	{ path: 'register', component: UserRegisterComponent },
	{ path: 'logout', component: UserLogoutComponent }
];

@NgModule({
	imports: [ RouterModule.forChild(userRoutes) ],
	exports: [ RouterModule ],
})
export class UserRoutingModule {}