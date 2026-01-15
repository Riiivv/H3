import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllHalls } from './all-halls';

describe('AllHalls', () => {
  let component: AllHalls;
  let fixture: ComponentFixture<AllHalls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllHalls]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllHalls);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
