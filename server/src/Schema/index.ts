
import "reflect-metadata";
import { buildSchemaSync } from "type-graphql";

import { AuthenticationAssurance } from "../middlewares/AuthMiddleware";
import { AuthResolver } from "./Resolvers/AuthResolver";
import { UserResolver } from "./Resolvers/UserResolver";



export const schema = buildSchemaSync({
    resolvers: [
        UserResolver,
        AuthResolver
    ], 
    authChecker: AuthenticationAssurance,
  })
