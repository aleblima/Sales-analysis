import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home/home').then(m => m.HomeComponent)
    },
    {
        path: 'region',
        children: [
            {
                path: '',
                loadComponent: () => import('./region/region-list/region-list').then(m => m.RegionList)
            },
            {
                path: 'new',
                loadComponent: () => import('./region/region-form/region-form').then(m => m.RegionForm)
            }
        ]
    },
    {
        path: 'seller',
        children: [
            {
                path: '',
                loadComponent: () => import('./seller/seller-list/seller-list').then(m => m.SellerList)
            },
            {
                path: 'new',
                loadComponent: () => import('./seller/seller-form/seller-form').then(m => m.SellerForm)
            }
        ]
    },
    {
        path: 'sale',
        children: [
            {
                path: '',
                loadComponent: () => import('./sale/sale-list/sale-list').then(m => m.SaleList)
            },
            {
                path: 'new',
                loadComponent: () => import('./sale/sale-form/sale-form').then(m => m.SaleForm)
            }
        ]
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    },
];
