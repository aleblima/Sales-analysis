import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SaleList } from './sale-list';

describe('SaleList', () => {
  let component: SaleList;
  let fixture: ComponentFixture<SaleList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleList, HttpClientTestingModule],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(SaleList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
