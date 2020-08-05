import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('class_schedule', table => {
    table.increments('id').primary();

    /* Dia da semana */
    table.integer('week_day').notNullable();

    /* A que horas começa o atendimento; */
    table.integer('from').notNullable();

    /* Até que horário o professor atende. */
    table.integer('to').notNullable();

    /* Relacionametno da tabela. */
    table.integer('class_id')
      .notNullable()
      .references('id')
      .inTable('classes')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('class_schedule');
}