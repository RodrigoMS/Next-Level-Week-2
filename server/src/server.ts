/* Arquivo que vai gerenciar todas as 
   solucitações a aplicação. */

/* Importação de bibliotecas. */
import express from 'express';
import cors from 'cors';

/* Importação dos arquivos criados 
   pelo programador. */
import routes from './routes';

/* Todas as rotas e requisições vão 
   partir do express. */
   
// Módulo de roteamento do express.
const app = express();

app.use(cors());

/* Converte o JSON para objeto JS.*/
app.use(express.json());
app.use(routes);

/* Definição da porta do servidor.*/
app.listen(3333);