import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RegionList } from './region-list';

describe('RegionList', () => {
  let component: RegionList;
  let fixture: ComponentFixture<RegionList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionList, HttpClientTestingModule],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(RegionList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
