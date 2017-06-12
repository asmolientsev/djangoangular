import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Topic } from '../entities/topic';
import { UserService } from '../../users/services/user.service';

@Injectable()
export class TopicService {
	private domain = 'http://localhost:8000';
	private topicUrl = '/topics/';

	constructor(private http: Http, private userService: UserService){ }

	handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getTopics(): Promise<Topic[]> {
		const url = `${this.domain + this.topicUrl}`;
		let headers = this.userService.getHeaders();
		return this.http.get(url, {headers: headers})
			.toPromise()
			.then(response =>  response.json() as Topic[])
			.catch(this.handleError);
	}
	getTopic(id:number): Promise<Topic> {
		const url = `${this.domain + this.topicUrl}${id}/`;
		let headers = this.userService.getHeaders();
		return this.http.get(url, {headers: headers})
			.toPromise()
			.then(response =>  response.json() as Topic)
			.catch(this.handleError);
	}
}