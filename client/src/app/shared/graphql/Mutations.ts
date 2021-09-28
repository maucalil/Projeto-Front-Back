import { gql } from "apollo-angular";

export const LOGIN = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            id
            email
            role
        }
    } 
}`

export const REGISTER = gql`
    mutation register($name: String!,$email: String!, $password: String!) {
        register(name: $name, email: $email, password: $password) {
            successful
            message
        } 
    }
`

export const DELETE_USER = gql`
    mutation deleteUser($id: Float!, $adminId: Float!) {
        deleteUser(id: $id, adminId: $adminId) {
            successful
            message
        }
    }
`

export const UPDATE_PASSWORD = gql`
    mutation updatePassword($id: Float!, $oldPassword: String!, $newPassword: String!) {
        updatePassword(id: $id, oldPassword: $oldPassword, newPassword: $newPassword) {
            successful
            message
        }
    }`

export const SET_ADMIN = gql`
    mutation setAdmin($id: Float!, $adminId: Float!) {
        setAdmin(id: $id, adminId: $adminId) {
            successful
            message
        }
    }
`