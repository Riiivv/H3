import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSeats } from './all-seats';

describe('AllSeats', () => {
  let component: AllSeats;
  let fixture: ComponentFixture<AllSeats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllSeats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSeats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
