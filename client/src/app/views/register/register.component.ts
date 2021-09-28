import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/authentication/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      name: [null],
      email: [null],
      password: [null]
    });
  }

  async onRegister() {
    const name = this.form.value.name;
    const email = this.form.value.email;
    const password = this.form.value.password;
    return await this.authService.register(name, email, password);
  }
}
