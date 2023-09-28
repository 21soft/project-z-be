import {Knex} from "knex"
import { DBConfig } from "./src/config/config";
import * as path from 'path';

const BASE_PATH = path.join(__dirname, 'src', 'database', 'migrations');

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: DBConfig,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: BASE_PATH
    },
  },
};

module.exports = config;
