import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDesignSubCategoryComponent } from './add-design-sub-category.component';

describe('AddDesignSubCategoryComponent', () => {
  let component: AddDesignSubCategoryComponent;
  let fixture: ComponentFixture<AddDesignSubCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDesignSubCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDesignSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
