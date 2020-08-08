import React, { useState, useEffect } from 'react'
import { Text, TextInput, View, ScrollView } from 'react-native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'
import { Feather } from '@expo/vector-icons'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'

import styles from './styles'
import api from '../../services/api'
import { useFocusEffect } from '@react-navigation/native'

function TeacherList() {
    const [teachers, setTeachers] = useState([])
    const [favorites, setFavorites] = useState<number[]>([])

    /* Se o filtro esta visível ou não. */
    const [isFiltersVisible, setIsFiltersVisible] = useState(false)

    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')

    /* Cria um histórico em formato JSON */
    function loadFavorites() {
        /* Cria um banco de dados modo texto armazenado na aplicação.
           Este banco de dados retorna uma lista de favoritos em modo texto. */
        AsyncStorage.getItem('favorites').then(response => {
            /* Se veio texto na variável resposta ele retorna a lista de favoritos
               em modo JSON. */
            if (response) {
                /* Converte o texto do banco de dados e converte em JSON. */
                const favoritedTeachers = JSON.parse(response)
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id
                })

                /* Salva o id em setFavorites. */
                setFavorites(favoritedTeachersIds)
            }
        })
    }

    /* Recarrega os favoritos quando volta para a tela Proffys. */
    useFocusEffect(()  => {
        loadFavorites()
    })

    /* Quando tocar no botão de filtro, mostra o formulário. */
    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!isFiltersVisible)
    }

    /* Quando ouver o toque no botão filtrar, será executado
       a solicitação ao servidor pelo axios em server api.ts. */
    async function handleFiltersSubmit() {
        loadFavorites()

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        })

        //console.log(response.data)

        setIsFiltersVisible(false)
        setTeachers(response.data)
    }

    return (
        <View style={styles.container}>
            <PageHeader title="Proffys disponíveis"
                headerRight={
                    /* Botão para exibir o formulário. */
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color="#fff"></Feather>
                    </BorderlessButton>
                }
            /* O formulário estará visivel apenas se isFiltersVisible
                estiver com valor true. */
            >{isFiltersVisible &&
                (<View style={styles.searchForm}>
                    <Text style={styles.label}>Matéria</Text>
                    <TextInput
                        style={styles.input}
                        value={subject}
                        onChangeText={text => setSubject(text)}
                        placeholder="Qual a matéria?"
                        placeholderTextColor='#c1bccc'
                    />
                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Dia da semana</Text>
                            <TextInput
                                style={styles.input}
                                value={week_day}
                                onChangeText={text => setWeekDay(text)}
                                placeholder="Qual o dia?"
                                placeholderTextColor='#c1cbcc'
                            />
                        </View>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Horário</Text>
                            <TextInput
                                style={styles.input}
                                value={time}
                                onChangeText={text => setTime(text)}
                                placeholder="Qual o horário?"
                                placeholderTextColor='#c1cbcc'
                            />
                        </View>
                    </View>

                    {/* Botão que com base no preenchimento do formulário,
                        busca os professores correspodentes a pesquisa. */}
                    <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Filtrar</Text>
                    </RectButton>
                </View>
                )}

            </PageHeader>

            {/* Cria um elemento com scroll. */}
            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem
                        key={teacher.id}
                        teacher={teacher}
                        favorited={favorites.includes(teacher.id) ? true : false}
                    />
                })}
            </ScrollView>
        </View>
    )
}

export default TeacherList

/* Para os inputs procutar por react-native-community/picker
   esta biblioteca cria selects. 
   
   
   parou 1:03:00*/