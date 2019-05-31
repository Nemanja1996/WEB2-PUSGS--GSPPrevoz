import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorizeUserComponent } from './unauthorize-user.component';

describe('UnauthorizeUserComponent', () => {
  let component: UnauthorizeUserComponent;
  let fixture: ComponentFixture<UnauthorizeUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnauthorizeUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthorizeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
