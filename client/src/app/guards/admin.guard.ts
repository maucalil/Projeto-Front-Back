import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { User } from '../models/User';
import { UserService } from '../views/account/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  response: boolean = false;
  constructor(
    private userService: UserService,
    ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

      const id: number = parseInt(window.localStorage.getItem('userId')!, 10);
      return this.userService.getUser(id).pipe(map( res => {
        if(res.role === "admin") {

          return true;
        }
        return false;
      }), take(1));
    } 
}
