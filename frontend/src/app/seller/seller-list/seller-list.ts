import { Component, inject, OnInit, signal } from '@angular/core';
import { SellerService } from '../seller';
import { Seller } from '../seller-model';
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
  sellers = signal<Seller[]>([]);
  private sellerService = inject(SellerService);

  ngOnInit(): void {
    this.sellerService.getAll().subscribe({
      next: (data) => this.sellers.set(data),
      error: (err) => console.log(err)
    });
  }

  delete(id: number): void {
    this.sellerService.delete(id).subscribe({
      next: () => this.sellers.update(list => list.filter(s => s.id !== id)),
      error: (err) => console.error(err)
    });
  }
}
