import { Component, inject, OnInit, signal } from '@angular/core';
import { RegionService } from '../region';
import { Region } from '../region-model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-region-list',
  imports: [RouterLink],
  templateUrl: './region-list.html',
  styleUrl: './region-list.css',
})
export class RegionList implements OnInit {
  private regionService = inject(RegionService);
  regions = signal<Region[]>([]);

  ngOnInit(): void {
    this.regionService.getAll().subscribe({
      next: (data) => this.regions.set(data),
      error: (err) => console.error(err)
    });
  }

  delete(id: number): void {
    this.regionService.delete(id).subscribe({
      next: () => this.regions.update(list => list.filter(r => r.id !== id)),
      error: (err) => console.error(err)
    })
  }
}
