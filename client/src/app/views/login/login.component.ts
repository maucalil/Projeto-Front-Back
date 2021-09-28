import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      email: [null],
      password: [null]
    });
  }

  async onLogin() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    return await this.authService.login(email, password);
  }
}
