import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeeplaidComponent } from './deeplaid.component';

describe('DeeplaidComponent', () => {
  let component: DeeplaidComponent;
  let fixture: ComponentFixture<DeeplaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeeplaidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeeplaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
