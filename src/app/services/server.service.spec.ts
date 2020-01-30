import { TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { ServerService } from './server.service';

describe('ServerService', () => {
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClient]
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
  });

  it('should be created', () => {
    const service: ServerService = TestBed.get(ServerService);
    expect(service).toBeTruthy();
  });
});
