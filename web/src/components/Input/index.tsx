
/* InputHTMLAttributes - todos os atributos que um
   imput pode receber. */
import React, { InputHTMLAttributes } from 'react'

import './styles.css';

/* Extende a interfade (tipo) para um InputHTMLAttributes. 
   Desta forma o componete poderá receber qualquer atriuto 
   que um elemento input possui. 

   <> - Indica que é um parametro genérico
   HTMLInputElement - variável do tipo global.*/
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;

}

/* Definição de um componente com a tipagem (typescript). */
/* ...reste - rest polulation, que captura todas as propriedades
   que não sejam label e name.*/
const Input: React.FC<InputProps> = ({ label, name, ...rest }) => {
  return (
    <div className="input-block">
        <label htmlFor={name}>{label}</label>
        { /*...rest - repassa todas as propriedades que um 
          input pode ter.*/ }
        <input type="text" id={name} {...rest} />
  </div>
  )
}

export default Input;
