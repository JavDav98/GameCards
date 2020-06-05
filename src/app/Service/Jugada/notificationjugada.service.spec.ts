import { TestBed } from '@angular/core/testing';

import { NotificationjugadaService } from './notificationjugada.service';

describe('NotificationjugadaService', () => {
  let service: NotificationjugadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationjugadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
