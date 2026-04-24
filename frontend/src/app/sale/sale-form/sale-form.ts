import { Component, inject, OnInit } from '@angular/core';
import { SaleService } from '../sale';
import { RegionService } from '../../region/region';
import { SellerService } from '../../seller/seller';
import { Seller } from '../../seller/seller-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sale-form',
  imports: [],
  templateUrl: './sale-form.html',
  styleUrl: './sale-form.css',
})
export class SaleForm implements OnInit {
  private saleService = inject(SaleService);
  private sellerService = inject(SellerService);
  private router = inject(Router);

  idSeller: number | null = null;
  total: number | null = null;
  date: string = '';
  sellers: Seller[] = []

  ngOnInit(): void {
    this.sellerService.getAll().subscribe({
      next: (data) => this.sellers = data,
      error: (err) => console.error(err)
    });
  }

  onSubmit(): void {
    this.saleService.create(this.idSeller!, this.total!, this.date).subscribe({
      next: () => this.router.navigate(['/sale']),
      error: (err) => console.error(err)
    })
  }

}
