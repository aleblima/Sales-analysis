import { Component, inject, OnInit } from '@angular/core';
import { RegionService } from '../region';
import { Region } from '../region-model';

@Component({
  selector: 'app-region-list',
  imports: [],
  templateUrl: './region-list.html',
  styleUrl: './region-list.css',
})
export class RegionList implements OnInit {
  private regionService = inject(RegionService);
  regions: Region[] = [];

  ngOnInit(): void {
    this.regionService.getAll().subscribe({
      next: (data) => this.regions = data,
      error: (err) => console.error(err)
    });
  }

  delete(id: number): void {
    this.regionService.delete(id).subscribe({
      next: () => this.regions = this.regions.filter(r => r.id != id),
      error: (err) => console.error(err)
    })
  }
}
