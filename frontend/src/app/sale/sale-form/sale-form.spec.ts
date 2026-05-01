import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SaleForm } from './sale-form';

describe('SaleForm', () => {
  let component: SaleForm;
  let fixture: ComponentFixture<SaleForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleForm, HttpClientTestingModule],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(SaleForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
