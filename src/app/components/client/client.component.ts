import { Component, OnInit, OnDestroy } from '@angular/core';
import { News } from '../../models/news';
import { Subscription } from 'rxjs';
import { ServerService } from '../../services/server.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit, OnDestroy {
  news: News[] = [];
  newSubscription: Subscription;

  constructor(private newService: ServerService) { }

  ngOnInit() {
    this.newService.getNews();
    this.newSubscription = this.newService
      .sendNewsToComp()
      .subscribe((newsComing: News[]) => {
        this.news = newsComing;
        console.log('newsComing: ', newsComing);
      });
    console.log(this.news);
  }

  onDelete(storyId: number) {
    console.log('deleting, sr');
    this.newService.deleteNews(storyId);
  }

  navigateTo(url: string) {
    console.log('navigating to: ', url);
    window.open(url, '_blank');
  }

  ngOnDestroy() {
    this.newSubscription.unsubscribe();
  }
}
