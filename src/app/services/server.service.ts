import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { News } from '../models/news';
import { Rawdata } from '../models/rawdata';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

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
      .get<{ news: News[] }>('http://localhost:3000/api/news')
      .pipe(map((newsData) => {
        return newsData.news.map(newsDoc => {
          return {
            id: newsDoc._id,
            author: newsDoc.author,
            created_at: newsDoc.created_at,
            story_title: newsDoc.story_title,
            story_url: newsDoc.story_url,
          };
        });
      }))
      .subscribe(transformedNews => {
        this.news = transformedNews;
        this.newsRx.next([...this.news]);
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
          this.cleanedData.push(item);
        });
        // load the initial data in the template
        this.newsRx.next(this.cleanedData);
      });

  }

  // function that populates the DB with the cleanedData
  populateDB() {
    console.log('load the DB');
    // for each element in cleanedData, save as document in a collection
    this.cleanedData.forEach(item => {
      this.saveDocument(item.author, item.created_at, item.story_title, item.story_url);
    });
  }

  // function that saves each document in mongoDB reingnfs data base
  saveDocument(id: string, author: string, createdAt: Date, storyTitle: string, storyUrl: string) {
    const newDoc: News = { _id: id, author, created_at: createdAt, story_title: storyTitle, story_url: storyUrl };
    this.http
      .post<{ nDoc: News }>('http://localhost:3000/api/news', newDoc)
      .subscribe(nDoc => {
        const idd = nDoc.id;
        newDoc._id = idd;
        this.news.push(newDoc);
        this.newsRx.next([...this.news]);
      });
    }

  deleteNews(storyId: any) {
    console.log(`Deleting news with id: ${storyId}`);
    this.http.delete(`http://localhost:3000/api/posts/${storyId}`)
      .subscribe(() => {
        const updatedNews = this.news.filter(newsDoc => newsDoc._id !== storyId);
        this.news = updatedNews;
        this.newsRx.next(updatedNews);
      });
  }
}

