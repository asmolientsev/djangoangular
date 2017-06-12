import { NgModule }      from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { PostModule } from './posts/post.module';
import { UserModule } from './users/user.module';

import { AppRoutingModule }     from './app.routing';

@NgModule({
  imports:      [ 
  	BrowserModule,
  	PostModule,
  	UserModule,
  	AppRoutingModule
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ Title ],
})
export class AppModule { }
