import { Component, inject, OnInit, signal } from '@angular/core';
import { SaleService } from '../sale';
import { SellerService } from '../../seller/seller';
import { Seller } from '../../seller/seller-model';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sale-form',
  imports: [FormsModule, RouterLink],
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
  sellers = signal<Seller[]>([]);

  ngOnInit(): void {
    this.sellerService.getAll().subscribe({
      next: (data) => this.sellers.set(data),
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
