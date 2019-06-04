import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLinesGridComponent } from './admin-lines-grid.component';

describe('AdminLinesGridComponent', () => {
  let component: AdminLinesGridComponent;
  let fixture: ComponentFixture<AdminLinesGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLinesGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLinesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
