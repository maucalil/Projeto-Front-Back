import { verify, JwtPayload } from "jsonwebtoken";
import { AuthChecker } from "type-graphql";
import { getRepository } from "typeorm";
import AuthConfig from "../config/auth"
import { Users } from "../Entities/Users";
import { IUser } from "../Interfaces/IUser";

interface Context {
    token?: string;
    user?: IUser;
}

export const AuthenticationAssurance: AuthChecker<Context> = async ({ context }, roles ) => {
    const authHeader = context.token;
    if (!authHeader) {
        return false;
    }
    console.log(roles)
    // console.log(authHeader);
    if(roles.length != 0) {
        const user = context.user;
        const userRole = await Users.findOne(user?.id)
        console.log(userRole)
        if(userRole?.role != roles[0]) {
            return false;
        }
    }
    const [, token] = authHeader.split(' '); // se der algum erro é por causa disso aqui, faça o log e veja o retorno
    // console.log(token);

    try { 
        const decoded = verify(token, AuthConfig.jwt.secret);

        return !!decoded; // transforma em boolean
    } 
    catch (err) {
        console.log(err);
        return false;
    }
}

