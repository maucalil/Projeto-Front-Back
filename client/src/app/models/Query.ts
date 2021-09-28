import { User } from "./User";

export type Query = {
    getAllUsers: User[]
    getUser: User
}