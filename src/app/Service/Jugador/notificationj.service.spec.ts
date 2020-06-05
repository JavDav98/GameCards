import { TestBed } from '@angular/core/testing';

import { NotificationJService } from './notificationj.service';

describe('NotificationJService', () => {
  let service: NotificationJService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationJService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
