import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemModelComponent } from './item-model.component';

describe('ItemModelComponent', () => {
  let component: ItemModelComponent;
  let fixture: ComponentFixture<ItemModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
