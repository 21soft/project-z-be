import Knex from "knex";
import { DBConfig } from "./config";

const knex = Knex({
    client: 'pg',
    connection: DBConfig,
    migrations: {
        tableName: 'migrations'
    }
})

export default knex