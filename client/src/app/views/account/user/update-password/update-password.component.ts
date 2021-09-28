import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/authentication/auth.service'; 
import { UserService } from '../user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      oldPassword: [null],
      newPassword: [null],
    });
  }

  async onUpdatePassword() {
    await this.route.params.subscribe(params => {
      const id = parseInt(params.id);
      const oldPassword = this.form.value.oldPassword;
      const newPassword = this.form.value.newPassword;
      this.userService.updatePassword( id, oldPassword, newPassword );
      
    });
  }
}
