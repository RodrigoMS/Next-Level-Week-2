/* Lista todas as conexões.*/

import { Request, Response } from "express";
import db from "../database/connection";

export default class ConnectionsController {

  /* Exibir as conexões. */
  async index(request: Request, response: Response) {
    /* Retorna o cotal de linhas. */
    const totalConnections = await db('connections').count('* as total');

    const { total } = totalConnections[0];

    return response.json({ total });
  }
  
  /* Criar uma nova conexão. */
  async create(request: Request, response: Response) {
    const { user_id } = request.body;

    /* Inserir o ID do usuário e o horário é automático.*/
    await db('connections').insert({
      user_id
    });

    /* Retorna status 201 - Criado com sucesso.*/
    return response.status(201).send();
  }
}