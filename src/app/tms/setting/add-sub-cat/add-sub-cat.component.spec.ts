import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubCatComponent } from './add-sub-cat.component';

describe('AddSubCatComponent', () => {
  let component: AddSubCatComponent;
  let fixture: ComponentFixture<AddSubCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubCatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
