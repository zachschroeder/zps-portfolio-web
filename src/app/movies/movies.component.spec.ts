import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesComponent } from './movies.component';
import { MoviesService } from './movies.service';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let mockService = jasmine.createSpyObj('MoviesService', ['fetchMovieList']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesComponent],
      providers: [
        {
          provide: MoviesService,
          useValue: mockService
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchMovieList on init', () => {
    // Assert
    expect(mockService.fetchMovieList).toHaveBeenCalled();
  });
});
