import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'delivery-list',
    pathMatch: 'full'
  },
  {
    path: 'delivery-list',
    loadChildren: () => import('./delivery-list/delivery-list.module').then( m => m.DeliveryListPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
