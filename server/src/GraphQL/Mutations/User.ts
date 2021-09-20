import { GraphQLID, GraphQLString } from "graphql";

import { Users } from "../../Entities/Users";
import { MessageType } from "../TypeDefs/Messages";

const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
import { hash } from "bcryptjs";

export const CREATE_USER = {
    type: MessageType,
    args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const { name, email, password } = args;
        try { 

            const userAlreadyExists = await Users.findOne({
                email
            });
        
            if (userAlreadyExists) {
                return { successful: false, message: "User already exists!"}
            }

            const passwordHash = await hash(password, SALT_ROUNDS);
            await Users.insert({ name, email, password: passwordHash});     

            return { successful: true, message: "User created successfully!"}
        }
        catch (err) {
            return { successful: false, message: err}
        }  
    },
};

export const UPDATE_PASSWORD = {
    type: MessageType,
    args: {
        email: { type: GraphQLString },
        oldPassword: { type: GraphQLString },
        newPassword: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {

        const {email, oldPassword, newPassword} = args;
        try { 
            const user = await Users.findOne({ email: email });
            const userPassword = user?.password;

            if(oldPassword === userPassword) {
                await Users.update({email: email}, {password: newPassword});
                return { successful: true, message: "Password updated successfully!"}
            }
            else { 
                return { successful: false, message: "Passwords don't match!"}
            }  
            
        }
        catch(err) {
            
        }
    },
}

export const DELETE_USER = {
    type: MessageType,
    args: {
        id: { type: GraphQLID }
    },
    async resolve(parent: any, args: any) {

        const id = args.id;
        try {
            
            await Users.delete({id: id}) // as it is a id, can just do (id)
            return { successful: true, message: "User deleted successfully!"}
        } 
        catch (err) {
            return {successful: false, message: err}
        }
        
    },
}