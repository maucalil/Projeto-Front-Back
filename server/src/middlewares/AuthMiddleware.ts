import { verify, JwtPayload } from "jsonwebtoken";
import { AuthChecker } from "type-graphql";
import AuthConfig from "../config/auth"

interface Context {
    token?: string;
}

export const AuthenticationAssurance: AuthChecker<Context> = ({ context }): boolean => {
    const authHeader = context.token;

    if (!authHeader) {
        return false;
    }

    const [, token] = authHeader.split(' ');

    try { 
        const decoded = verify(token, AuthConfig.jwt.secret);

        return !!decoded; // transforma em boolean
    } 
    catch (err) {
        console.log(err);
        return false;
    }
}

