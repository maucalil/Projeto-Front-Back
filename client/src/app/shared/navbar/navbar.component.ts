import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/views/account/user/user.service';
import { AuthService } from '../authentication/auth.service';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  logged: boolean = false;
  admin: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    ) { }

  navbarOpen: boolean = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  ngOnInit(): void {
    this.logged = this.authService.loggedIn();

    const id: number = parseInt(window.localStorage.getItem('userId')!, 10);
    this.userService.getUser(id).subscribe(user => {
      if(user.role === "admin") {
        this.admin = true;
      }
      else {
        this.admin = false;
      }
    });
    

  }

  onLogout() {
    this.authService.logout();
  }
}
