import { Injectable, Input, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators'
import { LOGIN, REGISTER } from '../../shared/graphql/Mutations';
import { Router } from '@angular/router';



@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private apollo: Apollo, private router: Router) { }

    async login(email: string, password: string){
        try {
          await this.apollo.mutate<any>({
            mutation: LOGIN,
            variables: {
                email: email,
                password: password
            } 
        }).subscribe(({data}) => {
            if(data.login.token !== null && data.login.token !== undefined && data.login.token !== "") {
               window.localStorage.setItem('token', data.login.token)  
               window.localStorage.setItem('userId', data.login.user.id)  
               this.router.navigate(['/']).then(() => { window.location.reload()})
            }
            else {

                this.router.navigate(['/login'])
            }
        })  
        }
        catch(error) {
            console.log("erro" + error)
        } 
    }

    async register(name: string, email: string, password: string) {
        try {
            await this.apollo.mutate<any>({
              mutation: REGISTER,
              variables: {
                  name: name,
                  email: email,
                  password: password
              } 
          }).subscribe(({data}) => {
              alert(`${data.register.message}`)
              this.login(email, password);
          })  
          }
          catch(error) {
              console.log("erro" + error)
          } 
    }

    loggedIn() {
        return !!this.getToken();
    }

    logout() {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('userId');
        this.router.navigate(['/']);
    }
    
    getToken() {
        return window.localStorage.getItem('token');
    }
}
