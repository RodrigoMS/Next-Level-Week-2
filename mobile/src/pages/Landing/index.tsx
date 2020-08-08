import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

/* Cria um botão que se adapta ao sistema operacional em uso. */
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';
import api from '../../services/api';

function Landing(){

  const { navigate } = useNavigation();

  const [totalConnections, setTotalConnections] = useState(0)

  useEffect(() => {
      api.get('connections').then(response => {
          const { total } = response.data
          setTotalConnections(total)
      })
  }, [])

  /* Função que realiza a navegação para a tela GiveClasses. */
  function handleNavigateGiveClassesPage() {
    navigate('GiveClasses');
  }

  /* Este procedimento é nomeado encadeamento de rotas (routes).*/
  /* Realiza o roteamento em abas para a página Study. */
  function handleNagivateToStudyPages() {
    navigate('Study');
  }

  return (
    <View style={styles.container}>
      {/* Em vez de src na tag image, usa-se source. */}
      <Image source={landingImg} style={styles.banner}/>

      <Text style={styles.title} >
        Seja bem-vindo, {'\n'}
        {/* Text dentro de Text vai herdar o css. */}
        <Text style={styles.titleBold}>O que deseja fazer?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        {/* No React-native não existe o parametro onclick
              este parametro possui o nome onPress. */}
        <RectButton 
          onPress={handleNagivateToStudyPages}
          style={[styles.button, styles.buttonPrimary]}
        >
          <Image source={studyIcon} />

          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>

        <RectButton 
          onPress={handleNavigateGiveClassesPage} 
          style={[styles.button, styles.buttonSecondary]}
        >
          <Image source={giveClassesIcon} />

          <Text style={styles.buttonText}>Dar aulas</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>
        Total de {totalConnections} conexões já realizadas {' '}
        <Image source={heartIcon} />
      </Text>
    </View>
  );
}

export default Landing;