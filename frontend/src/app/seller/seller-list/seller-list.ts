import { Component, inject, OnInit } from '@angular/core';
import { SellerService } from '../seller';
import { Seller } from '../seller-module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-seller-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './seller-list.html',
  styleUrl: './seller-list.css',
})
export class SellerList implements OnInit {
  sellers: Seller[] = [];
  private sellerService = inject(SellerService);

  ngOnInit(): void {
    this.sellerService.getAll().subscribe({
      next: (data) => this.sellers = data,
      error: (err) => console.log(err)
    });
  }

  delete(id: number): void {
    this.sellerService.delete(id).subscribe({
      next: () => this.sellers = this.sellers.filter(s => s.id !== id),
      error: (err) => console.error(err)
    });
  }
}
