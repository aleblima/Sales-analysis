import { Component, inject, OnInit } from '@angular/core';
import { Sale } from '../sale-model';
import { SaleService } from '../sale';

@Component({
  selector: 'app-sale-list',
  imports: [],
  templateUrl: './sale-list.html',
  styleUrl: './sale-list.css',
})
export class SaleList implements OnInit {
  sales: Sale[] = [];
  private saleService = inject(SaleService);

  ngOnInit(): void {
    this.saleService.getAll().subscribe({
      next: (data) => this.sales = data,
      error: (err) => console.error(err)
    });
  }

  delete(id: number): void {
    this.saleService.delete(id).subscribe({
      next: () => this.sales = this.sales.filter(s => s.id !== id),
      error: (err) => console.error(err)
    })
  }
}
