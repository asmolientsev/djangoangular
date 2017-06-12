import { Injectable, Output, EventEmitter  } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from '../entities/user';

@Injectable()
export class UserService {
	private domain: string = 'http://localhost:8000';
	private tokenUrl: string  = '/get-token/';
	private username: string  = '';
	private password: string  = '';
	private token: string  = '';
	private userUrl: string  = '/users/';
	private id: string = '';

	@Output() loginEmitter: EventEmitter<string> = new EventEmitter<string>();
	@Output() logoutEmitter: EventEmitter<any> = new EventEmitter<any>();

	constructor(private http: Http) {}

	getToken(): Promise<any> {
			const authCredential = {
				'username': this.username, 
				'password': this.password 
			};
			return this.http.post(this.domain+this.tokenUrl, authCredential, this.getHeaders())
				.toPromise()
				.then(response => response.json())
				.then(data => {
					if ('token' in data){ 
						this.token = data.token;
						this.id = data.id;
						// this.headers.append('Authorization', 'Basic'+' '+btoa(this.authCredential.username+':'+this.authCredential.password));
						return true;
					}else{
						return false;
					}
				})
				.catch(this.handleError);
	}

	handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	create(user:User) {
		const url = this.domain + this.userUrl;
		const data = {
			username: user.username,
			email: user.email,
			password: user.password
		};
		return this.http.post(url, JSON.stringify(data), {headers: this.getHeaders()})
			.toPromise()
			.then(response => {
				let user = response.json();
				this.username = user.username;
				this.password = user.password;
				this.getToken()
				.then(() => this.login());
			})
			.catch(this.handleError);
	}

	auth(user:User): Promise<any> {
		this.username = user.username;
		this.password = user.password;
		return this.getToken()
			.then((result) => {
				if (result)	this.login();
				return result;
			});
	} 

	login() {
		window.sessionStorage.setItem('token', this.token);
		window.sessionStorage.setItem('username', this.username);
		window.sessionStorage.setItem('id', this.id);
		this.loginEmitter.emit(this.username);
	}

	logout() {
		window.sessionStorage.removeItem('token');
		window.sessionStorage.removeItem('username');
		window.sessionStorage.removeItem('id');
		this.logoutEmitter.emit(null);
	}

	isLogIn(): boolean {
		return !!window.sessionStorage.getItem('token');
	}

	getHeaders(): Headers {
		let headers = new Headers({'Content-Type':'application/json', });
		if (this.isLogIn()){
			let token = window.sessionStorage.getItem('token');
			headers.append('Authorization', 'Token'+' '+token);
		}		
		return headers;
	}

	getLoginEmmiter() {
		return this.loginEmitter;
	}

	getLogoutEmmiter() {
		return this.logoutEmitter;
	}

	getUserId(): number {
		return +window.sessionStorage.getItem('id');
	}

	getUsername(): string {
		return window.sessionStorage.getItem('username');	
	}
}