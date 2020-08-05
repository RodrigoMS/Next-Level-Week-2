import Knex from 'knex';

/* Quais alterações a migração realizará. */
export async function up(knex: Knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('avatar').notNullable();
    table.string('whatsapp').notNullable();
    table.string('bio').notNullable();
  });
}

/* Desfaz as alterações criadas pelo método up. */
export async function down(knex: Knex) {
  return knex.schema.dropTable('users');
}