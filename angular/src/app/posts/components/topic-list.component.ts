import { Component, OnInit } from '@angular/core';

import { TopicService } from '../services/topic.service';
import { Topic } from '../entities/topic';

@Component({
	selector: 'topic-list',
	templateUrl: './topic-list.component.html',
	styleUrls: [ './topic-list.component.css' ],
})
export class TopicListComponent implements OnInit {

	topics: Topic[];
	selectedTopic: Topic;

	constructor(private topicService: TopicService){}

	ngOnInit() {
		this.getTopics();
	}

	onSelect(topic: Topic): void {
		this.selectedTopic = topic;
	}

	getTopics(): void {
		this.topicService.getTopics()
			.then(topics => this.topics = topics);
	}

}