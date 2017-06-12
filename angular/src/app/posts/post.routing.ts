import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostListComponent }    from './components/post-list.component';
import { PostDetailComponent } from './components/post-detail.component';
import { TopicListComponent } from './components/topic-list.component';

const postRoutes: Routes = [
  // { path: 'dashboard',  component: DashboardComponent },
  	{ path: 'topic/:id',     component: PostListComponent },
  	{ path: 'post/:id', component: PostDetailComponent },
  	{ path: 'topics',     component: TopicListComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(postRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class PostRoutingModule { }