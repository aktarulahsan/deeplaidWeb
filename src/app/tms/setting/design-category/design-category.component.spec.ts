import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignCategoryComponent } from './design-category.component';

describe('DesignCategoryComponent', () => {
  let component: DesignCategoryComponent;
  let fixture: ComponentFixture<DesignCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
