import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdatePasswordComponent } from '../user/update-password/update-password.component';
import { UserComponent } from '../user/user.component';

const routes: Routes = [
  {path: 'user', component: UserComponent},
  {path: 'updatePassword/:id', component: UpdatePasswordComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
