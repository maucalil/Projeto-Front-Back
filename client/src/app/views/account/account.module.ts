import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './routes/account-routing.module';
import { UpdatePasswordComponent } from './user/update-password/update-password.component';
import { FormDebugComponent } from 'src/app/shared/form-debug/form-debug.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UpdatePasswordComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule
  
  ]
})
export class AccountModule { }
