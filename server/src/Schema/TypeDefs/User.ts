import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";
import { Field, InputType, ObjectType } from "type-graphql";
import { IUser } from "../../Interfaces/IUser";

@ObjectType()
export class User implements IUser{

    @Field()
    id?: number;

    @Field()
    name!: string;

    @Field()
    email!: string;

    @Field()
    password!: string;

    @Field()
    role?: string

}