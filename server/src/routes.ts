import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();

/* Metodos HTTP
   
   GET: Burcar ou listar uma informação.
   POST : Criar alguma nova informação
   PUT: Atualizar uma informação existente.
   DELETE: Apaga uma informãção.*/

/* Definição das rotas. 
   Solicitações via URL ( rota )- GET.
   Envio de dados, qu e realizam a criação de dados metodo POST. */
routes.get('/classes', classesController.index);
routes.post('/classes', classesController.create);

routes.post('/connections', connectionsController.create);
routes.get('/connections', connectionsController.index);

export default routes;