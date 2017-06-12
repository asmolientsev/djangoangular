import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

const appRoutes: Routes = [
  { path: '',   redirectTo: '/topics', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
	imports: [
 		RouterModule.forRoot(appRoutes),
	],
	exports: [ RouterModule ],
})
export class AppRoutingModule {}