import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Query } from '../../../models/Query';
import { User } from '../../../models/User';
import { map, take } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { GET_ALL_USERS } from '../../../shared/graphql/Query';
import { DELETE_USER, SET_ADMIN } from 'src/app/shared/graphql/Mutations';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private apollo: Apollo,
    private router: Router
    
    ) { }

  getAllUsers(): Observable<User[]> {
   return this.apollo.watchQuery<Query>({
      query: GET_ALL_USERS
    }).valueChanges
      .pipe(
        map(result => result.data.getAllUsers)
      );
  }

  async deleteUser(id: number, adminId: number){
    return this.apollo.mutate({
      mutation: DELETE_USER,
      variables: {
        id: id,
        adminId: adminId
      }
    }).pipe(take(1)).subscribe( () => window.location.reload() )
  }

  async setAdmin(id: number, adminId: number) {{
    return this.apollo.mutate({
      mutation: SET_ADMIN,
      variables: {
        id: id,
        adminId: adminId
      }
    }).pipe(take(1)).subscribe( () => window.location.reload() );
  }}
}
