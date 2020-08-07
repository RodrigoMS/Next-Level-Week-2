import React from 'react';

/* Elemento que tem que estar por vilta de todas as rotas. */
import { NavigationContainer } from '@react-navigation/native';

/* Cria uma navegação em pilha. */
import { createStackNavigator } from '@react-navigation/stack';

import Landing from '../pages/Landing';
import GiveClasses from '../pages/GiveClasses';
import StudyTabs from './StudyTabs';

/* Navigator - cuidará da navegação.
   screen - as rotas. */
const { Navigator, Screen } = createStackNavigator();

function AppStack() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{
        /* headerShown: false - Oculta o cabeçário da tag. */
        headerShown: false
      }}>
        <Screen name="Landing" component={Landing} />
        <Screen name="GiveClasses" component={GiveClasses} />
        <Screen name="Study" component={StudyTabs} />
      </Navigator>
    </NavigationContainer>
  );
}

export default AppStack;