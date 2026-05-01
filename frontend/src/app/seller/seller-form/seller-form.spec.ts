import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SellerForm } from './seller-form';

describe('SellerForm', () => {
  let component: SellerForm;
  let fixture: ComponentFixture<SellerForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerForm, HttpClientTestingModule],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(SellerForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
