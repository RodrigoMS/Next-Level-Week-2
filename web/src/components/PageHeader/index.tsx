import React from 'react';

/* Link - Permite realizar a troca de páginas
   sem realizar o recarregamento. */
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

/* Criação de interface 
   Desta forma é obrigatório receber um título (title).*/
interface PageHeaderProps {
  title: string;
}

/* React.FC - Function component que recebe 2 parametros.
   children - objeto que vem como padrão. Qual o conteúdo 
   que estou enviando para o component. */
const PageHeader: React.FC<PageHeaderProps> = ({ title, children }) => {
  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={backIcon} alt="Voltar"/>
        </Link>
        <img src={logoImg} alt="Proffy"/>
      </div>

      <div className="header-content">
        <strong>{title}</strong>
      
        {children}
      </div>
    </header>
  );
}

export default PageHeader;