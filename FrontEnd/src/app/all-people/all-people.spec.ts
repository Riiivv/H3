import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPeople } from './all-people';

describe('AllPeople', () => {
  let component: AllPeople;
  let fixture: ComponentFixture<AllPeople>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllPeople]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPeople);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
