import { compare } from "bcryptjs";
import { Arg, Mutation, Resolver } from "type-graphql";
import { sign } from "jsonwebtoken";

import { Users } from "../../Entities/Users";
import { Auth } from "../TypeDefs/Auth";
import AuthConfig from "../../config/auth"

@Resolver()
export class AuthResolver  {

    @Mutation(() => Auth)
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        ): Promise<Auth> {
            const user = await Users.findOne( 
                { email: email },
             );
    
            if(!user) {
                throw new Error("Incorrect email/password combination!");
            };
    
            const passwordMatched = await compare(password, user.password);
    
            if(!passwordMatched) {
                throw new Error("Incorrect email/password combination!");
            }
    
            const { secret, expiresIn } = AuthConfig.jwt;
    
            const token = sign({}, secret,{ subject: `${user.id}`, expiresIn});
    
            return {
                token,
                user: user
            }
        }
}