import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomplitedComponent } from './incomplited.component';

describe('IncomplitedComponent', () => {
  let component: IncomplitedComponent;
  let fixture: ComponentFixture<IncomplitedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomplitedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomplitedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
