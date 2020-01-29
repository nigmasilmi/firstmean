import { Component, OnInit } from '@angular/core';
import { News } from '../../models/news';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  news: News[] = [];
  constructor() { }

  ngOnInit() {
  }

  onDelete() {
    console.log('deleting, sr');
  }

}
