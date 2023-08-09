import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpAddressCreateComponent } from './ip-address-create.component';

describe('IpAddressCreateComponent', () => {
  let component: IpAddressCreateComponent;
  let fixture: ComponentFixture<IpAddressCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpAddressCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpAddressCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
