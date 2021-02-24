import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDesignCategoryComponent } from './add-design-category.component';

describe('AddDesignCategoryComponent', () => {
  let component: AddDesignCategoryComponent;
  let fixture: ComponentFixture<AddDesignCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDesignCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDesignCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
