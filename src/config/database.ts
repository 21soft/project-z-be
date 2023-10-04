import Knex from "knex";
import { DBConfig } from "./config";

const knex = Knex({
    client: 'pg',
    connection: DBConfig,
    migrations: {
        tableName: 'migrations'
    },
    pool: {
        min: 0,
        max: 7
    }
})

export default knex