import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddControlorComponent } from './add-controlor.component';

describe('AddControlorComponent', () => {
  let component: AddControlorComponent;
  let fixture: ComponentFixture<AddControlorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddControlorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddControlorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
