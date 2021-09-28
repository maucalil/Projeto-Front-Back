import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user!: User;
  id: number = parseInt(window.localStorage.getItem('userId')!, 10);
  
  constructor(
    private userService: UserService,
    private router: Router,
    ) { }
  
  ngOnInit(): void {
    this.userService.getUser(this.id).subscribe(user => this.user = user);
    
  }

  onUpdatePassword() {
    return this.router.navigate([`/account/updatePassword/${this.id}`]);
  }
}
