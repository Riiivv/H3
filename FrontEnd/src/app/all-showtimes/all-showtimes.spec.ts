import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllShowtimes } from './all-showtimes';

describe('AllShowtimes', () => {
  let component: AllShowtimes;
  let fixture: ComponentFixture<AllShowtimes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllShowtimes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllShowtimes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
