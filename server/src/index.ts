import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
// import { createConnection } from 'typeorm';
import { graphqlHTTP } from 'express-graphql';

import { schema } from './GraphQL';
import { connectToDb } from './database/connect'


const main = async () => {
    
    await connectToDb();

    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use("/graphql", graphqlHTTP({
        schema,
        graphiql: true,
    }));
    app.listen(3000, () => console.log('listening on http://localhost:3000'))
};

main().catch( err => console.log(err) );
