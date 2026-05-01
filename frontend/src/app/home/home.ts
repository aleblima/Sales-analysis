import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SaleService } from '../sale/sale';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  private saleService = inject(SaleService);

  totalSales = signal<number>(0);
  totalRevenue = signal<number>(0);

  ngOnInit(): void {
    this.saleService.getAll().subscribe({
      next: (sales) => {
        this.totalSales.set(sales.length);
        this.totalRevenue.set(sales.reduce((sum, sale) => sum + sale.total, 0));
      },
      error: (error) => {
        console.error('Error fetching sales data:', error);
      }
    });
  }
}
