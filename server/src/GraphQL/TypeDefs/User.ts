import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";
import { IUser } from "../../Interfaces/IUser";

export const UserType = new GraphQLObjectType<IUser>({
    name: "User",
    fields: () => ({
        id: { type: GraphQLID},
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },

    }),
});