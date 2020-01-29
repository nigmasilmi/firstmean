import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { News } from '../models/news';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  news: News[] = [];
  newsRx = new Subject<News[]>();

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

  deleteNews(storyId: number) {
    console.log(`Deleteting news with id: ${storyId}`);
  }
}
