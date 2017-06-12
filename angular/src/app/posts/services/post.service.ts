import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Post } from '../entities/post';
import { Topic } from '../entities/topic';
import { UserService } from '../../users/services/user.service';

@Injectable()
export class PostService {
	private domain = 'http://localhost:8000';
	private postUrl = '/posts/';
	private topicUrl = '/topics/';

	constructor(private http: Http, private userService: UserService){ }

	getPosts(topic_id: number): Promise<Post[]> {
		const url = `${this.domain + this.topicUrl}${topic_id}/posts/`;
		let headers = this.userService.getHeaders();
		return this.http.get(url, {headers: headers})
			.toPromise()
			.then(response =>  response.json() as Post[])
			.catch(this.handleError);
	}

	handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getPost(id:number): Promise<Post> {
		const url = `${this.domain + this.postUrl}${id}/`;
		let headers = this.userService.getHeaders();
		return this.http.get(url, {headers: headers})
			.toPromise()
			.then(response =>  response.json() as Post)
			.catch(this.handleError);
	}

	getTopics(): Promise<Topic[]> {
		const url = `${this.domain}{this.topicUrl}/`;
		let headers = this.userService.getHeaders();
		return this.http.get(url, {headers: headers})
			.toPromise()
			.then(response =>  response.json() as Topic[])
			.catch(this.handleError);
	}
}