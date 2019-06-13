import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllorProfileComponent } from './controllor-profile.component';

describe('ControllorProfileComponent', () => {
  let component: ControllorProfileComponent;
  let fixture: ComponentFixture<ControllorProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControllorProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControllorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
