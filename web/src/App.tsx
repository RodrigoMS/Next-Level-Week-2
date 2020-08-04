// Sempre que for usar HTML dentro do componente
// deve inserir a importação do React.
import React from 'react';

import Routes from './routes';

// Importação do CSS direto dentro do JS.
import './assets/styles/global.css';

// Componentes com letra maiúscula.
function App() {
	// JSX - HTML dentro do código. 
  	return (
    	<Routes />
    );
}

export default App;
