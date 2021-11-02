import React, { useState, useEffect } from 'react';
import TopBar from '../Components/TopBar';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Button, Text, Input, Card, ListItem } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux'

function UserPage(props) {
    const [user, setUser] = useState('')
    const token = props.token
    useEffect(() => {
        async function loadUser() {

            var rawResponse = await fetch(`https://vitejaifaim-master-i57witqbae0.herokuapp.com/users/me/${token}`)
            var response = await rawResponse.json()
            // console.log(response.userInfo.lastName)
            setUser(response.userInfo)
        }
        loadUser()
        console.log("", props.adress)
    }, [])

    // console.log(user.lastName)

    return (
        <ScrollView>
            <TopBar navigation={props.navigation} />
            <Text
                h3
                style={{
                    alignSelf: 'center',
                    marginTop: 15,
                    textDecorationLine: 'underline',
                    color: '#FFC901',
                }}
            >
                Informations Personelles
            </Text>

            <Card containerStyle={styles.container} wrapperStyle={styles.wrapper}>
                <Card.Title style={{ marginBottom: 0 }}> Nom:</Card.Title>
                <Text>{user.lastName} </Text>
                <Button
                    type="clear"
                    onPress={() => console.log('bonjour')}
                    icon={<Ionicons size={25} name="create-outline" color="#FFC901" />}
                />
            </Card>

            <Card containerStyle={styles.container} wrapperStyle={styles.wrapper}>
                <Card.Title style={{ marginBottom: 0 }}> Prénom:</Card.Title>
                <Text>{user.firstName} </Text>
                <Button
                    type="clear"
                    onPress={() => console.log('bonjour')}
                    icon={<Ionicons size={25} name="create-outline" color="#FFC901" />}
                />
            </Card>
            <Card containerStyle={styles.container} wrapperStyle={styles.wrapper}>
                <Card.Title style={{ marginBottom: 0 }}> Email:</Card.Title>
                <Text>{user.email} </Text>
                <Button
                    type="clear"
                    onPress={() => console.log('bonjour')}
                    icon={<Ionicons size={25} name="create-outline" color="#FFC901" />}
                />
            </Card>
            <Card containerStyle={styles.container} wrapperStyle={styles.wrapper}>
                <Card.Title style={{ marginBottom: 0 }}> Téléphone:</Card.Title>
                <Text>{user.phone} </Text>
                <Button
                    type="clear"
                    onPress={() => console.log('bonjour')}
                    icon={<Ionicons size={25} name="create-outline" color="#FFC901" />}
                />

            </Card>

            <Card containerStyle={styles.container} wrapperStyle={styles.wrapper}>
                <Card.Title style={{ marginBottom: 0 }}> Adresse:</Card.Title>
                <Text>{props.address} </Text>
                <Button
                    type="clear"
                    onPress={() => console.log('bonjour')}
                    icon={<Ionicons size={25} name="create-outline" color="#FFC901" />}
                />
            </Card>
            <Card containerStyle={styles.container} wrapperStyle={styles.wrapper}>
                <Card.Title style={{ marginBottom: 0 }}> Régime alimentaire:</Card.Title>
                <Text>{user.regimeAlim} </Text>
                <Button
                    type="clear"
                    onPress={() => console.log('bonjour')}
                    icon={<Ionicons size={25} name="create-outline" color="#FFC901" />}
                />

            </Card>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        elevation: 4,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'rgba(0,0,0, 0.2)',
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
        alignItems: 'center',
    },
})

function mapStateToProps(state) {
    return {
        token: state.token,
        address: state.address
    }
}

export default connect(mapStateToProps, null)(UserPage)
