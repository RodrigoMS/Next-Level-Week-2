import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';

import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

/* Arquivos criados pelo programados devem conter "./" (caminho relativo.)*/
import './styles.css';

const Landing: React.FC = () => {
  return (
    <div id="page-landing">
      {/* className - POrque class é uma palavra resenvada do JS
          desta forma é necessário trocar o nome para className.*/}
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          {/* {nome variável JS} - As aspas permitem adicionar variáveis
              dentro do HTML.*/}
          <img src={logoImg} alt="Proffy"/>
          <h2>Sua plataforma de estudos online.</h2>
        </div>

        <img 
          src={landingImg} 
          alt="Plataforma de estudos" 
          className="hero-image"
        />

        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={studyIcon} alt="Estudar"/>
            Estudar
          </Link>

          <Link to="give-classes" className="give-classes">
            <img src={giveClassesIcon} alt="Dar aulas"/>
            Dar aulas
          </Link>
        </div>

        <span className="total-connections">
          Total de 200 conexões já realizadas <img src={purpleHeartIcon} alt="Coração roxo"/>
        </span>
      </div>
    </div>
  );
}

export default Landing;