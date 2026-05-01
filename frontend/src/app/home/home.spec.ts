import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home';
import { SaleService } from '../sale/sale';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let saleServiceStub: Partial<SaleService>;

  beforeEach(async () => {
    saleServiceStub = {
      getAll: () => of([
        { id: 1, seller: 'A', region: 'R1', total: 100, date: '2023-01-01' },
        { id: 2, seller: 'B', region: 'R2', total: 250.5, date: '2023-01-02' }
      ])
    };

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: SaleService, useValue: saleServiceStub },
        { provide: ActivatedRoute, useValue: { params: of({}) } }
      ]
    }).compileComponents();
  });

  it('should calculate total sales and total revenue from sale service', () => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit

    expect(component.totalSales()).toBe(2);
    expect(component.totalRevenue()).toBe(350.5);
  });
});