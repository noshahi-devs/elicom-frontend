import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Componen } from './componen';

describe('Componen', () => {
  let component: Componen;
  let fixture: ComponentFixture<Componen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Componen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Componen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
