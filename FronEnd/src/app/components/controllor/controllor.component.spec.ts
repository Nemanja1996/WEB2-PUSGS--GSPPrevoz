import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllorComponent } from './controllor.component';

describe('ControllorComponent', () => {
  let component: ControllorComponent;
  let fixture: ComponentFixture<ControllorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControllorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControllorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
