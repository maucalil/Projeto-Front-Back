import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../../models/User';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users!: Observable<User[]>;
  sessionId!: number; // será o id que vereficaremos se é admin
  
  constructor(
    private usersService: UsersService,
    ) { }
    
    ngOnInit() {
    this.users = this.usersService.getAllUsers();
    this.sessionId =  parseInt(window.localStorage.getItem('userId')!, 10);
  }

  async onSetAdmin(id: number) {
    await this.usersService.setAdmin( id, this.sessionId )
  }

  async onDelete(id: number) {
    await this.usersService.deleteUser( id, this.sessionId );
  }
}
