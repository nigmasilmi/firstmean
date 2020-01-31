import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { News } from '../models/news';
import { Rawdata } from '../models/rawdata';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  news: News[] = [];
  newsRx = new Subject<News[]>();
  cleanedData: any = [];

  constructor(private http: HttpClient) { }

  getNews() {
    this.http
      .get<{ data: News[] }>('http://localhost:3000/api/news')
      .subscribe(resBody => {
        this.news = resBody.data;
        this.newsRx.next(resBody.data);
      });
  }

  sendNewsToComp() {
    return this.newsRx.asObservable();
  }

  firstDataLoad() {
    // get resources
    let rawData = [];
    this.http.get<Rawdata>('http://hn.algolia.com/api/v1/search_by_date?query=nodejs')
      .subscribe(whatComes => {
        rawData = whatComes.hits;
        // clean the data according to the requirements
        // data needed to bring: story_title, title, author, url, posted date
        // properties of interest: created_at, story_title or title, url, author
        rawData.forEach(element => {
          const item = {
            story_title: '',
            story_url: '',
            author: '',
            created_at: null
          };
          if (element.title === null && element.story_title === null) {
            return;
          } else if (element.story_title !== null) {
            item.story_title = element.story_title;
          } else {
            item.story_title = element.title;
          }

          if (element.url === null && element.story_url === null) {
            return;
          } else if (element.story_url !== null) {
            item.story_url = element.story_url;
          } else {
            item.story_url = element.url;
          }

          item.author = element.author;
          item.created_at = element.created_at;
          console.log(item);
          this.cleanedData.push(item);
        });
        // load the initial data in the template
        this.newsRx.next(this.cleanedData);
      });

  }

  populateDB() {
    console.log('load the DB');
  }

  deleteNews(storyId: number) {
    console.log(`Deleting news with id: ${storyId}`);
  }
}
