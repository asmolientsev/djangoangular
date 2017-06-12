import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Post } from '../entities/post';
import { PostService } from '../services/post.service';

@Component({
	selector: 'post-detail',
	templateUrl: './post-detail.component.html',
})
export class PostDetailComponent implements OnInit { 
	@Input() post: Post;

	constructor(
		private postService: PostService,
		private route: ActivatedRoute
		){ }

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.postService.getPost(+params['id']))
			.subscribe(post => this.post = post);
	}
}