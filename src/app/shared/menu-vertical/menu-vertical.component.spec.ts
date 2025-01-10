import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuVerticalComponent } from './menu-vertical.component';

describe('MenuVerticalComponent', () => {
  let component: MenuVerticalComponent;
  let fixture: ComponentFixture<MenuVerticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuVerticalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
