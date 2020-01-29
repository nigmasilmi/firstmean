import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { News } from "../models/news";

@Injectable({
  providedIn: "root"
})
export class ServerService {
  news: News[] = [];
  constructor(private http: HttpClient) {}

  getNews() {
    this.http
      .get<{ message: string; news: News[] }>("localhost:3000/api/news")
      .subscribe(resBody => {
        this.news = resBody.news;
      });
  }
}
