import { createConnection } from "typeorm";
import { Users } from "../Entities/Users";

const connectToDb = async () => {
    try { 
        await createConnection({
            type: "mysql",
            database: "Projetinho",
            username: "root",
            password: "d3sbloque@r",
            logging: true,
            synchronize: false, // quando é true cria a tabela na db
            entities: [Users]
        })
        console.log("Conexão com o banco de dados estabelecida!")
    }
    catch (err) {
        console.error("Erro:", err);
    }
}

export {connectToDb}