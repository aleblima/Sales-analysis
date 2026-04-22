import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionForm } from './region-form';

describe('RegionForm', () => {
  let component: RegionForm;
  let fixture: ComponentFixture<RegionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionForm],
    }).compileComponents();

    fixture = TestBed.createComponent(RegionForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
