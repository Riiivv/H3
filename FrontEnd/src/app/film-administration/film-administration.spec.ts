import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmAdministration } from './film-administration';

describe('FilmAdministration', () => {
  let component: FilmAdministration;
  let fixture: ComponentFixture<FilmAdministration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmAdministration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmAdministration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
