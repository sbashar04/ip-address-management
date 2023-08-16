import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpAddressEditComponent } from './ip-address-edit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('IpAddressEditComponent', () => {
  let component: IpAddressEditComponent;
  let fixture: ComponentFixture<IpAddressEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpAddressEditComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpAddressEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('IP Address can not be edited', () => {
    expect(component.form.get('ip_address') === null).toBeTruthy();
  });

  it('Label can be edited', () => {
    expect(component.form.get('label')).toBeTruthy();
  });

});
