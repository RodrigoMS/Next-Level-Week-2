import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import'./styles.css';

const TeacherItem: React.FC = () => {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://avatars3.githubusercontent.com/u/2126218?s=460&u=7ab930065593117c109609eae7f25878d3e9b08d&v=4" alt="Rodrigo M. S."/>
        <div>
          <strong>Rodrigo M. S.</strong>
          <span>Programming</span>
        </div>
      </header>

      <p>
        Atuante da área de desenvolvimento de softwares desde 2013. 
        <br/> <br/>
        Linguagens estudadas até o momento: PHP, NodeJS, GO. 
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 80,00</strong>
        </p>
        <button type="button" >
          <img src={whatsappIcon} alt="WhatsApp"/>
          Entrar em contato
        </button>
      </footer>
    </article>
  );
}

export default TeacherItem;