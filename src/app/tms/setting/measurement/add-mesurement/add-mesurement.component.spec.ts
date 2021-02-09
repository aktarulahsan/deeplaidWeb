import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMesurementComponent } from './add-mesurement.component';

describe('AddMesurementComponent', () => {
  let component: AddMesurementComponent;
  let fixture: ComponentFixture<AddMesurementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMesurementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMesurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
