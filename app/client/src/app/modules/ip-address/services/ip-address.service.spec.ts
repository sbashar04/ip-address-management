import { TestBed } from '@angular/core/testing';

import { IpAddressService } from './ip-address.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('IpAddressService', () => {
  let service: IpAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(IpAddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
