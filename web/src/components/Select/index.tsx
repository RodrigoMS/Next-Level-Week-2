import React, { SelectHTMLAttributes } from 'react'

import './styles.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    name: string;
    options: Array<{
      value: string;
      label: string;
    }>;
}

const Select: React.FC<SelectProps> = ({ label, name, options, ...rest }) => {
  return (
    <div className="select-block">
        <label htmlFor={name}>{label}</label>
        {/* defaultValue - No React substitui o "selected" da option. */}
        <select defaultValue="" value="" id={name} {...rest}>
          <option value="" disabled hidden >Selecione uma opção</option>
          {options.map(option => {
            /* Quando se tem um array no HTML no react ele exige uso de key
               no primeiro elemento dento de um map.
               key - Infromação unica que existe entre todas as opções.Que ajuda
               o react na renderização dos elementos.*/
            return <option key={option.value} value={option.value}>{option.label}</option>
            }
          )}
        </select>
  </div>
  )
}

export default Select;
