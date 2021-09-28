import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { GetUserQuery } from 'src/app/models/GetUserQuery';
import { Query } from 'src/app/models/Query';
import { User } from 'src/app/models/User';
import { UPDATE_PASSWORD } from 'src/app/shared/graphql/Mutations';
import { GET_USER } from 'src/app/shared/graphql/Query';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private apollo: Apollo,
    private router: Router
    ) { }

  
  getUser(id: number): Observable<User> {
    return this.apollo.watchQuery<GetUserQuery>({
       query: GET_USER,
       variables: {
         id: id
       }
     }).valueChanges.pipe(map(result => result.data.getUser))
   }

   updatePassword(id: number, oldPassword: string, newPassword: string){
    this.apollo.mutate<any>({
      mutation: UPDATE_PASSWORD,
      variables: {
        id: id,
        oldPassword: oldPassword,
        newPassword: newPassword
      }
    }).subscribe( data => {

      alert(`${data.data.updatePassword.message}`);
      if(data.data.updatePassword.message) {
        this.router.navigate(['/']);
      }
    })
}}
