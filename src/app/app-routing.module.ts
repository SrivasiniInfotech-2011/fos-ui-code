import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/pages/authentication/authentication.module').then((a) => a.AuthenticationModule)
  },
  {
    path: 'modules',
    loadChildren: () => import('./modules/modules.module').then((a) => a.ModulesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
