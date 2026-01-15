import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTickets } from './all-tickets';

describe('AllTickets', () => {
  let component: AllTickets;
  let fixture: ComponentFixture<AllTickets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllTickets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTickets);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
