import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishListToCartComponent } from './wish-list-to-cart.component';

describe('WishListToCartComponent', () => {
  let component: WishListToCartComponent;
  let fixture: ComponentFixture<WishListToCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishListToCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishListToCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
