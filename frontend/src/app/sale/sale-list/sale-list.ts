import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Sale } from '../sale-model';
import { SaleService } from '../sale';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-sale-list',
  imports: [RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './sale-list.html',
  styleUrl: './sale-list.css',
})
export class SaleList implements OnInit {
  sales = signal<Sale[]>([]);
  private saleService = inject(SaleService);

  totalRevenue = computed(() => this.sales().reduce((sum, sale) => sum + sale.total, 0));

  ngOnInit(): void {
    this.saleService.getAll().subscribe({
      next: (data) => this.sales.set(data),
      error: (err) => console.error(err)
    });
  }

  delete(id: number): void {
    this.saleService.delete(id).subscribe({
      next: () => this.sales.update(list => list.filter(s => s.id !== id)),
      error: (err) => console.error(err)
    })
  }
}
