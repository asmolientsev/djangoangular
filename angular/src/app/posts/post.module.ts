import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule }    from '@angular/http';

import { PostListComponent } from './components/post-list.component';
import { PostDetailComponent } from './components/post-detail.component';
import { TopicListComponent } from './components/topic-list.component';
import { PostService } from './services/post.service';
import { TopicService } from './services/topic.service';
import { PostRoutingModule } from './post.routing';


@NgModule({
	imports: [ 
		CommonModule,
		HttpModule,
		PostRoutingModule
	],
	declarations: [ 
		PostListComponent,
		PostDetailComponent,
		TopicListComponent
	],
	providers: [ PostService, TopicService ]
})
export class PostModule { }