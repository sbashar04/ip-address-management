import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpAddressEditComponent } from './ip-address-edit.component';

describe('IpAddressEditComponent', () => {
  let component: IpAddressEditComponent;
  let fixture: ComponentFixture<IpAddressEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpAddressEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpAddressEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
