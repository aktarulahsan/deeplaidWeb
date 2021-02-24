import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignSubCategoryComponent } from './design-sub-category.component';

describe('DesignSubCategoryComponent', () => {
  let component: DesignSubCategoryComponent;
  let fixture: ComponentFixture<DesignSubCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignSubCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
