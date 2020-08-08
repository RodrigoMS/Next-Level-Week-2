import React, { useState } from 'react'
import { View, Text, Image, Linking } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

/* Banco de dados modo texto. */
import AsyncStorage from '@react-native-community/async-storage'

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'
import styles from './styles'
import api from '../../services/api'

export interface Teacher {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
}

interface TeacherItemProps {
    teacher: Teacher;
    favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
    /* Toda a informação que pode ser manipulada pelo usuário ela precisa estas 
       em um estado. */
    const [isFavorited, setIsFavorited] = useState(favorited)

    /* Adicona o professor a lista de favoritos */
    async function handleToggleFavorites() {
        const favorites = await AsyncStorage.getItem('favorites')
        let favoritesArray = []

        if (favorites) {
            favoritesArray = JSON.parse(favorites)
        }

        /* Remove dos favoritos se o professor já estiver favoritado */
        if (isFavorited) {
            /* Procura qual a posição do professor dentro do array de favoritos. */
            const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
                return teacherItem.id === teacher.id
            })

            favoritesArray.splice(favoriteIndex, 1)
            setIsFavorited(false)

        /* Adiciona o professor aos favoritos. */
        } else {
            favoritesArray.push(teacher)
            setIsFavorited(true)
        }

        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))
    }

    function handleLinkToWhatsapp() {
        api.post('connections', {
            user_id: teacher.id
        })

        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    style={styles.avatar}
                    source={{ uri: teacher.avatar }}
                />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>

            <Text style={styles.bio}>{teacher.bio}</Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora {'     '}
                    <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton
                        onPress={handleToggleFavorites}

                        /* Se estiver favoritado adiciona o estilo se não adiciona um objeto vazio.
                           como se fosse um objeto de estilos vazio. */
                        style={[styles.favoriteButton,
                        isFavorited ? styles.favorited : {}]}
                    >
                        {isFavorited 
                            /* Verifica se é favorito  e adiciona o icon correspondente. */
                            ? <Image source={unfavoriteIcon} />
                            : <Image source={heartOutlineIcon} />
                        }
                    </RectButton>
                    <RectButton onPress={handleLinkToWhatsapp} style={styles.contactButton}>
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    )
}

export default TeacherItem