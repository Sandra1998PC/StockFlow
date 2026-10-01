import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ViewProduct } from './view-product/view-product';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'viewProduct/:id',
        component: ViewProduct
    }
];
