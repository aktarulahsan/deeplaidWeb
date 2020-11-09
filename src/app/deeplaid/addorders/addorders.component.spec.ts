import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddordersComponent } from './addorders.component';

describe('AddordersComponent', () => {
  let component: AddordersComponent;
  let fixture: ComponentFixture<AddordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddordersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
