import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";
import { Field, ObjectType } from "type-graphql";
import IAuth from "../../Interfaces/IAuth";
import { IUser } from "../../Interfaces/IUser";
import { User } from "./User";

@ObjectType()
export class Auth  implements IAuth {
    @Field(() => String)
    token!: string;

    @Field(() => User)
    user!: User;
}



