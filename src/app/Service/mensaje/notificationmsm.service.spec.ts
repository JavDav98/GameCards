import { TestBed } from '@angular/core/testing';

import { NotificationmsmService } from './notificationmsm.service';

describe('NotificationmsmService', () => {
  let service: NotificationmsmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationmsmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
