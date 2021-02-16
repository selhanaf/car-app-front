import { TestBed } from '@angular/core/testing';

import { TokenIneterceptorService } from './token-ineterceptor.service';

describe('TokenIneterceptorService', () => {
  let service: TokenIneterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenIneterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
