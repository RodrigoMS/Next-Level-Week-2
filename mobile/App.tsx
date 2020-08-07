import { StatusBar } from 'expo-status-bar';
import React from 'react';

/* Mostra icone de carregamento 
   Necessário para esperar o carregar 
   das fontes google.*/
import { AppLoading } from 'expo';

import { useFonts, Archivo_400Regular, Archivo_700Bold } from '@expo-google-fonts/archivo';

import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

import AppStack from './src/routes/AppStack';

export default function App() {

  let [fontsLoaded] = useFonts({
    Archivo_400Regular, 
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold
  });

  if(!fontsLoaded){

    return <AppLoading />;
  }else{

    return (
      /* Como os elementos no React e React native não
         permitem retornar dois elementos sem ter um 
         fechamento entre eles.
         Desta forma utliza-se o componente Fragment
         que pode ser representado por <></> ou a forma
         que esta sendo usada no código. Ele não será renderizado
         na aplicação.
      */
      <React.Fragment>
        <AppStack />
        <StatusBar style="light"/>
      </React.Fragment>
    );
  }
}

/* parou em 30:00 */