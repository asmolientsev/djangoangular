import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';

import { PostService } from '../services/post.service';
import { UserService } from '../../users/services/user.service';
import { TopicService } from '../services/topic.service';
import { Post } from '../entities/post';
import { Topic } from '../entities/topic';

@Component({
	selector: 'post-list',
	templateUrl: './post-list.component.html',
})
export class PostListComponent implements OnInit {

	posts: Post[];
	selectedPost: Post;
	topic: Topic;
	user_id: number;
	
	constructor(
		private postService: PostService,
		private userService: UserService,
		private topicSerice: TopicService,
		private route: ActivatedRoute,
		private router: Router) {
	}

	ngOnInit(): void {
		if (!this.userService.isLogIn())
			this.router.navigate(['login']);
		else{
			this.getTopic();
			this.getPosts();
			this.user_id = this.userService.getUserId();
		}
	}

	getPosts(): void {
		this.route.params
			.switchMap((params: Params) => this.postService.getPosts(+params['id']))
			.subscribe(posts => this.posts = posts);
	}

	onSelect(post: Post): void {
		this.selectedPost = post;
	}

	getTopic(): void {
		this.route.params
			.switchMap((params: Params)=> this.topicSerice.getTopic(+params['id']))
			.subscribe(topic => this.topic = topic);
	}

	// gotoDetail(post: Post): void {
 //    	this.router.navigate(['/post', post.id]);
 //  	}
}