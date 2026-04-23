import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RegionService } from '../region';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-region-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './region-form.html',
  styleUrl: './region-form.css',
})
export class RegionForm {
  private router = inject(Router);
  private regionService = inject(RegionService);

  regionName = '';

  onSubmit() {
    this.regionService.create(this.regionName).subscribe({
      next: () => this.router.navigate(['/region']),
      error: (err) => console.error(err)
    });
  }
}
