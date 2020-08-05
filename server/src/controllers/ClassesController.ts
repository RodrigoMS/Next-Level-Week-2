import { Request, Response } from "express";

import db from '../database/connection';
import convertHourToMinutes from "../utils/convertHourToMinutes";

/* Interface que cria um tipo para o ScheduleItem
   que é utilzado no método create. */
interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  async index(request: Request, response: Response) {
    /* query - Recebe os dados junto a URL.*/
    const filters = request.query;

    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;

    /* Caso o usuário não informou o dia da semana,  a matéria
       ou o horário, retrona um erro. */
    if (!filters.week_day || !filters.subject || !filters.time) {
      return response.status(400).json({
        error: 'Missing filters to search classes'
      })
    }

    const timeInMinutes = convertHourToMinutes(time);

    const classes = await db('classes')
      .whereExists(function() {
        this.select('class_schedule.*')
        .from('class_schedule')
        .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
        .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
        .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
        .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*']);

    return response.json(classes);
  }

  async create(request: Request, response: Response) {
    /* Desestruturação, recebendo os dados "data" contidos
       dentro da request.body. */
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = request.body;
  
    /* Transaction - Caso uma das operações falhar as demais
       não ocorrem.*/
    const trx = await db.transaction();

    try {

      /* Como o nome do atributo é igual ao nome do campo no 
         banco de dados é possível omitilo.

         insertedUsersIds - Após inserir retorna o ID do usuário criado. */
      const insertedUsersIds = await trx('users').insert({
        name, // atributo e campo com nomes diferentes ex: nome: name.
        avatar,
        whatsapp,
        bio
      });
    
      // Pega o ID criado.
      const user_id = insertedUsersIds[0];
    

      const insertedClassesIds = await trx('classes').insert({
        subject,
        cost,
        user_id
      });
    
      const class_id = insertedClassesIds[0];
    
      /* map - percore cada uma das posições do array. transformando-os 
         em um novo objeto. Retornado umnovo objeto com as alterações feitas. 
         scheduleItem: ScheduleItem - devido ao typescript é necessário criar
         uma interface. Sendo possível em vez de utilizar a interface definir
         o scheduleItem como - scheduleItem: any (que significa qualquer cousa)*/
      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          // Antes de inserir vai converter a hora em munitos.
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to)
        }
      })
    
      /* await - Aguardas a operação no banco ocorrer para depois continuar a 
         executar o restante do código.*/
      await trx('class_schedule').insert(classSchedule);
    
      /* Realizar as alterações no banco.
         Inserindo todas as informações no banco de dados.*/
      await trx.commit();
  
      /* Retorna status 201 - criado com sucesso. */
      return response.status(201).send();

    /* Caso ocorra algum erro no código acima, retrona ao usuário uma
       resposta de erro. */ 
    } catch (err) {

      /* Desfaz qualquer alteração que tenha ocorrido durante a escrita 
         no banco de dados.*/
      await trx.rollback();
  
      /* Status de erro.*/
      return response.status(400).json({
        error: '[ClassesController] - Unexpected error while creating new class'
      })
    }
  }
}