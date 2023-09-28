import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary()
        table.uuid('uuid')
        table.string('display_name')
        table.string('email').unique()
        table.string('password')
    })
}


export async function down(knex: Knex): Promise<void> {
}

