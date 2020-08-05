import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('connections', table => {
    table.increments('id').primary();

    /* Relacionamento que indica quando ocorreu
       uma conexão com um professor. */
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    /* Quando ocorreu a conexão. */
    table.timestamp('created_at')
      /* Pegar o horário atual. */
      .defaultTo('now()') // Para PostgresQL e 
      .defaultTo(knex.raw('CURRENT_TIMESTAMP')) // SQLite
      .notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('connections');
}