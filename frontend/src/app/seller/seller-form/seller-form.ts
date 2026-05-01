import { Component, inject, OnInit, signal } from '@angular/core';
import { SellerService } from '../seller';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RegionService } from '../../region/region';
import { Region } from '../../region/region-model';

@Component({
  selector: 'app-seller-form',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './seller-form.html',
  styleUrl: './seller-form.css',
})
export class SellerForm implements OnInit {
  private sellerService = inject(SellerService);
  private regionService = inject(RegionService);
  private router = inject(Router);

  name: string = '';
  idregion: number | null = null;
  regions = signal<Region[]>([]);

  ngOnInit(): void {
    this.regionService.getAll().subscribe({
      next: (data) => this.regions.set(data),
      error: (err) => console.error(err)
    });
  }

  onSubmit(): void {
    this.sellerService.create(this.name, this.idregion!).subscribe({
      next: () => this.router.navigate(['/seller']),
      error: (err) => console.log(err)
    });
  }
}
