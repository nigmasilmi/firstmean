import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ServerService } from '../../services/server.service';

import { ClientComponent } from './client.component';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('ClientComponent', () => {
  let component: ClientComponent;
  let fixture: ComponentFixture<ClientComponent>;
  let httpClient: HttpClient;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientComponent],
      imports: [
        MatButtonModule,
        MatListModule,
        MatIconModule,
        HttpClientTestingModule,

      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
