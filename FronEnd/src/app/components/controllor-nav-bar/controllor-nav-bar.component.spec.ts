import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllorNavBarComponent } from './controllor-nav-bar.component';

describe('ControllorNavBarComponent', () => {
  let component: ControllorNavBarComponent;
  let fixture: ComponentFixture<ControllorNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControllorNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControllorNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
