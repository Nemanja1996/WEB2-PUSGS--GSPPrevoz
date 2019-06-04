import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVehicleLocationComponent } from './admin-vehicle-location.component';

describe('AdminVehicleLocationComponent', () => {
  let component: AdminVehicleLocationComponent;
  let fixture: ComponentFixture<AdminVehicleLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminVehicleLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVehicleLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
