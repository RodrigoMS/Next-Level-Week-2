import React from 'react';

import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

interface PageHeaderprops {
    title: string;
    /* ? - Define que a propriedade não é obrigatória. */
    description?: string;
}

const PageHeader: React.FC<PageHeaderprops> = (props) => {
  return (
    <header className="page-header">
        <div className="top-bar-container">
            <Link to="/">
                <img src={backIcon} alt="Voltar"/>
            </Link>
            <img src={logoImg} alt="Proffy"/>
        </div>

        <div className="header-content">
            <strong>{props.title}</strong>

            {/* Se existir uma propriedade description então
                mostre a propriedade de descrição senão deixe
                vazio.

                Forma 1:
                { props.descripton ? <p>{props.description}</p> : null}
            */}

            {/* Forma 2 
                && - Operação end no Javascript - o que vier depois dele
                só será executada se a primeira parte for verdadeira. */}
            {/* <p>{ props.description && props.description }</p> */}
            
            { props.description && <p>props.description</p> }

            {props.children}
        </div>
    </header>
  );
}

export default PageHeader;