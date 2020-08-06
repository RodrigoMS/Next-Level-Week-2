import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom'

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';

function TeacherForm() {
  const history = useHistory();

  /* Conseito de estado. */
  /* Necessário pelo conseito da imutabilidade no React ou seja
     o valor das variáveis não podem ser modificadas. Para 
     realizar esta operação utiliza-se o useState. */
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: ''}
  ]);

  /* Função que adiciona novos campos de horário. */
  function addNewScheduleItem() {
    setScheduleItems([
    	/* Copia o array e insere o novo item.*/
       ...scheduleItems,
       { week_day: 0, from: '', to: ''}
    ]);
  }

  /* 3 aula: 1:25:00 */
  /* Obtem os horários do professor e os adiciona em um array. */
  function setScheduleItemValue(position:number, field: string, value: string) {
  	/* map - sempre fai retornas um array com o mesmo número de campos
  	   existentes na variãvel. */
    const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if(index === position) {

      	/* ...scheduleItem  - recebe { week_day: 0, from: '', to: ''}
      	 no final adiciona uma variável com colchete para redefir o 
      	 nome da propriedade. Neste caso "field será renomeado com "week_day" 
      	 que sobrescreverá o valor de Week_day já existente em scheduleItem. */
        return {...scheduleItem, [field]: value }
      }

      return scheduleItem;
    });

    setScheduleItems(updateScheduleItems);
  }

  /* Envia os dados para o servidor. */
  function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then(() => {
      alert('Gravado com sucesso');

      /* Redireciona o usuário para a Landing page.*/
      history.push('/');

    }).catch(() => {
      alert('Erro no cadastro');
    })

  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader 
        title="Que incrível que você quer dar aulas." 
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      {/* main - Container do formulário. */}
      <main>
        <form onSubmit={handleCreateClass}>
        <fieldset>
          <legend>Seus dados</legend>
          
          <Input 
            name="name" 
            label="Nome Completo" 
            value={name} 
            onChange={(e) => { setName(e.target.value)} }
          />

          <Input 
            name="avatar" 
            label="Avatar" 
            value={avatar} 
            onChange={(e) => { setAvatar(e.target.value)} }
          />

          <Input 
            name="whatsapp" 
            label="WhatsApp"
            value={whatsapp} 
            onChange={(e) => { setWhatsapp(e.target.value)} }
          />

          <Textarea 
            name="bio" 
            label="Biografia"
            value={bio} 
            onChange={(e) => { setBio(e.target.value)} }
          />
        </fieldset>

        <fieldset>
          <legend>Sobre a aulas</legend>
          
          <Select 
            name="subject" 
            label="Matéria" 
            value={subject} 
            onChange={(e) => { setSubject(e.target.value)} }
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Ciências', label: 'Ciências' },
              { value: 'Educação Física', label: 'Educação Física' },
              { value: 'Física', label: 'Física' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'História', label: 'História' },
              { value: 'Português', label: 'Português' },
              { value: 'Química', label: 'Química' }
            ]}
          />
          <Input 
            name="cost" 
            label="Custo da sua hora por aula" 
            value={cost} 
            onChange={(e) => { setCost(e.target.value)} }
          />
        </fieldset>
        
        <fieldset>
            <legend>Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => {
              return (
              	/* key - Obrigatório, porem permite obter apenas um mesmo horário no dia.*/
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Select 
                    name="week_day" 
                    label="Dia da semana" 
                    value={scheduleItem.week_day}
                    onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                    options={[
                      { value: '0', label: 'Domingo' },
                      { value: '1', label: 'Segunda-Feira' },
                      { value: '2', label: 'Terça-Feira' },
                      { value: '3', label: 'Quarta-Feira' },
                      { value: '4', label: 'Quinta-Feira' },
                      { value: '5', label: 'Sexta-Feira' },
                      { value: '6', label: 'Sábado' },
                    ]}
                  />
                  <Input 
                    name="from" 
                    label="Das" 
                    type="time" 
                    value={scheduleItem.from}
                    onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                  />
                  <Input 
                    name="to" 
                    label="Até" 
                    type="time"
                    value={scheduleItem.to}
                    onChange={e => setScheduleItemValue(index, 'to', e.target.value)} 
                  />
                </div>
              )
            })}
        </fieldset>

        <footer>
          <p>
            <img src={warningIcon} alt="Aviso importante" />
            Importante! <br />
            Preencha todos os dados
          </p>
          <button type="submit">
            Salvar Cadastro
          </button>
        </footer>
        </form>
      </main>
  </div>
  )
}

export default TeacherForm;