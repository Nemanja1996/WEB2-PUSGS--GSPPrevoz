import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllorHeaderComponent } from './controllor-header.component';

describe('ControllorHeaderComponent', () => {
  let component: ControllorHeaderComponent;
  let fixture: ComponentFixture<ControllorHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControllorHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControllorHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
