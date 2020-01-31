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
  savedTheGeeky: boolean;

  constructor(private newService: ServerService) { }

  ngOnInit() {
    this.newService.firstDataLoad();
    this.newSubscription = this.newService
      .sendNewsToComp()
      .subscribe((newsComing: News[]) => {
        this.news = newsComing;
      });
  }

  startDB() {
    this.newService.populateDB();
    this.savedTheGeeky = true;
  }




  // TODO: change the id property in the template accordingly
  onDelete(storyId: string) {
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
