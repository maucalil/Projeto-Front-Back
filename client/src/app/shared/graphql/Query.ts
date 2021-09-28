import { gql } from "apollo-angular";

export const GET_ALL_USERS = gql`
query getAllUsers{
  getAllUsers {
    id
    name
    email
    role
  } 
}`

export const GET_USER = gql`
query getUser($id: Float!){
  getUser(id: $id) {
    name
    email
    role
  } 
}`