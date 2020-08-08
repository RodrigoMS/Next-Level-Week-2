import React, { ReactNode } from 'react'
import { Text, Image, View } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'

import logoImg from '../../assets/images/logo.png'
import backIcon from '../../assets/images/icons/back.png'

import { useNavigation } from '@react-navigation/native'

import styles from './styles'

interface PageHeaderProps {
    title: string;

    /* Recebe um componente com uma propriedade.
       ? - indica que é opcional. */
    headerRight?: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, headerRight, children }) => {
    const { navigate } = useNavigation()

    function handleGoBack() {
        navigate('Landing')
    }

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <BorderlessButton onPress={handleGoBack}>
                    <Image source={backIcon} resizeMode="contain" />
                </BorderlessButton>

                <Image source={logoImg} resizeMode="contain" />
            </View>

            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                {headerRight}
            </View>

            {children}
        </View>
    )
}

export default PageHeader