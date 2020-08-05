import path from 'path';

module.exports = {
  client: 'sqlite3',
  connection: {
  	/* Caminho até chegar no banco de dados. */
    filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
  },

  /* migrations - Comandos de criação das tabelas e dados
     do banco de dados. */
  migrations: {

  	/* Caminho das migrações */
    directory: path.resolve(__dirname, 'src', 'database', 'migrations')
  }, 
  useNullAsDefault: true,
};
