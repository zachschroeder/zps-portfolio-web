import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationComponent],
    });
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('toggleBurgerAndMenu', () => {
    it('should toggle isActiveToggle', () => {
      // Arrange
      component.isActiveToggle = false;

      // Act
      component.toggleBurgerAndMenu();

      // Assert
      expect(component.isActiveToggle).toBeTrue();
    });
  });
});
