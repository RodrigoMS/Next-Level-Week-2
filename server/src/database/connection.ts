import knex from 'knex';
import path from 'path';

const db = knex({
	/* Definição do banco de dados. */	
	client: 'sqlite3',
	connection: {

		/* Vai criar o baco de dados dentro da pasta database.
		   Paramentos:
		   	__dirname - Pasta atual.
		   	  database.sqlite - Nome do banco. */
		filename: path.resolve(__dirname, 'database.sqlite'),
	}, 

	/* Todos os conteúdos não preencridos aplicar null. */
	useNullAsDefault: true,
});

export default db;