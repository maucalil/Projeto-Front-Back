import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { LoggedGuard } from './guards/logged.guard';
import { AdminGuard } from './guards/admin.guard';
import { RegisterComponent } from './views/register/register.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'admin',
    loadChildren: () => import('./views/admin/routes/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard, LoggedGuard, AdminGuard]
  },
  {
    path: 'account',
    loadChildren: () => import('./views/account/account.module').then(m => m.AccountModule),
    canActivate: [AuthGuard, LoggedGuard]
  },
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
