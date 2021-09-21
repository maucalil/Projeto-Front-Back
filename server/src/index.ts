import express from 'express';
import { ApolloServer } from "apollo-server-express";
import cors from 'cors';

import { connectToDb } from './config/connect'
import { schema } from './Schema';


const main = async () => {

    await connectToDb();

    const app = express();
    app.use(express.json());

    const apolloServer = new ApolloServer({
        schema: schema,
        context: ({ req }) => {
            req.headers.authorization
        }
    })

    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: true, path: '/graphql' });

    app.listen(3000, () => { console.log('listening on http://localhost:3000'); })
};

main().catch(err => console.log(err));
