import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('classes', table => {
    table.increments('id').primary();
    table.string('subject').notNullable();
    table.string('cost').notNullable();

    /* Relacionamento chave estranjeira com
       com a tabela usuários. *

       CASCADE - Reflete a atualização ou exclusão em todas
       as tabelas a qual a chave estrangeira estiver relacionada.

       .onUpdate('CASCADE') - Caso o ID seja alterado, será 
       alterado em todas o ID em todas as aulas do professor
       que está ocorrento a atualização.

       .onDelete('CASCADE') - Caso o professor seja deletado
       todos as suas aulas serão deletadas (Isso quando passado
       o parâmetro "CASCADE").

    */
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('classes');
}