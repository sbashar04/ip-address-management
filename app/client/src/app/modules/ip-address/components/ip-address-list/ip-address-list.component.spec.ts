import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpAddressListComponent } from './ip-address-list.component';

describe('IpAddressListComponent', () => {
  let component: IpAddressListComponent;
  let fixture: ComponentFixture<IpAddressListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpAddressListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpAddressListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
