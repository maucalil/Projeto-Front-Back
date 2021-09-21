import { Field, InputType, ObjectType } from "type-graphql";
import { Entity } from "typeorm";
import { IMessage } from "../../Interfaces/IMessage";

@ObjectType()
export class Message implements IMessage{
    @Field(() => Boolean)
    successful!: boolean;

    @Field(() => String)
    message!: string;


}