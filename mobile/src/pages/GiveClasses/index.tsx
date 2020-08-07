import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';

import givClassesBGImage from '../../assets/images/give-classes-background.png';
import { useNavigation } from '@react-navigation/native';

function GiveClasses() {
  
  const { goBack } = useNavigation();

  function handleNavigateBack() {
    /* Volta para a tela anterior. */
    goBack();
  }

  return (
    <View style={styles.container}>
      <ImageBackground 
        resizeMode="contain"
        source={givClassesBGImage} 
        style={styles.content}
      >
        <Text style={styles.title}>Quer ser um Proffy?</Text>
        <Text style={styles.description}>
          Para começar, voce precisa se cadastrar como professor na nossa plataforma web.
        </Text>
      </ImageBackground>

      <RectButton 
        onPress={handleNavigateBack} 
        style={styles.okButton}
      >
        <Text style={styles.okButtonText}>Tudo bem</Text>
      </RectButton>
    </View>
  );
}

export default GiveClasses;