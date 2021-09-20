import { GraphQLList } from "graphql"
import { UserType } from "../TypeDefs/User"
import { Users } from "../../Entities/Users";
import { IUser } from "../../Interfaces/IUser";

export const GET_ALL_USERS = {
    type: new GraphQLList(UserType), // retorna uma lista de users
    resolve(): Promise<IUser[]> {
        return Users.find({ select: ["id","name", "email"] });
    }
}