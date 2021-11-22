import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import TopBar from '../Components/TopBar'
import { connect } from 'react-redux'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'

function Donts(props) {

    const token = props.token
    const [userDonts, setUserDonts] = useState([])
    const [manualIngredient, setManualIngredient] = useState('')
    const [dontExists, setDontExists] = useState(false)
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
    const isFocused = useIsFocused()


    //affichage des donts
    useEffect(() => {
        async function loadDonts() {

            var rawResponse = await fetch(`https://vitejaifaimclem.herokuapp.com/users/myDonts/${token}`)
            var response = await rawResponse.json()

            setUserDonts(response.donts)

            if (response.donts.length > 0 && response.donts[0] !== null) {
                setDontExists(true)
            }
        }

        loadDonts()

    }, [isFocused]);


    if (dontExists) {
        var showUserDonts = userDonts.map((dont, k) => {
            return (
                < View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25, marginBottom: 25 }} key={k}>
                    <Text style={{ alignSelf: 'center' }}>{dont}</Text>
                    <Button
                        title=""
                        type="clear"
                        onPress={() => {
                            handleDontDelete(dont)
                        }}
                        icon={<Ionicons size={25} name="trash-outline" color="#000000" />}
                    />
                </View >
            )
        })
    } else {
        var showUserDonts =
            < View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 25, marginBottom: 25 }}>
                <Text>vous n'avez pas de dont renseignés</Text>
            </View>
    }

    const handleManualAdd = () => {
        setManualIngredient('')
        setUserDonts(prevDonts => [...prevDonts, manualIngredient])
        handleDonts()
    }


    //Ajout de dont
    const handleDonts = async () => {
        try {
            const dont = manualIngredient

            if (manualIngredient != '') {
                const listDont = await fetch(
                    `https://vitejaifaimclem.herokuapp.com/users/adddonts/${token}`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: `dont=${dont}`,
                    }
                )
                props.addDont(manualIngredient)
            }
        } catch (err) {
            console.log(err)
        }
    }

    //suppression de donts
    async function handleDontDelete(dont) {

        var filterDonts = userDonts.filter((e) => (e !== dont))
        setUserDonts(filterDonts)
        props.removeDont(dont)

        var rawResponse = await fetch(
            `http:/vitejaifaim-master-i57witqbae0.herokuapp.com/users/deletedonts/${token}/${dont}`,
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }
        )

        var response = await rawResponse.json()

        if (response.donts.length == 0) {
            setDontExists(false)
        }
    }


    return (
        <View style={styles.container}>
            <TopBar navigation={props.navigation} />
            <ScrollView >
                <Text h2 style={{ color: '#F2A902', textAlign: 'center', marginTop: "4%" }}>Donts</Text>
                <ScrollView style={styles.userDonts}>
                    {showUserDonts}
                </ScrollView>
                <View style={styles.container}>
                    <Text h4 style={styles.sectionTitle}>
                        Je n'aime pas du tout :
                    </Text>
                    <View style={styles.ingredients}>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            keyboardVerticalOffset={keyboardVerticalOffset}
                        >
                            <Input
                                onChangeText={value => setManualIngredient(value)}
                                value={manualIngredient}
                                rightIcon={
                                    <AntDesign
                                        name="pluscircleo"
                                        size={24}
                                        color="black"
                                        onPress={handleManualAdd}
                                    />
                                }
                                placeholder="Ajoutez un ingrédient"

                            />
                        </KeyboardAvoidingView>
                    </View>
                </View>
            </ScrollView>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    userDonts: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        margin: 15,
        borderColor: '#F2A902',
    },
    sectionTitle: {
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center',
    }
})

function mapDispatchToProps(dispatch) {
    return {
        addDont: function (dont) {
            dispatch({ type: 'ADD_DONT', newDont: dont })
        },
        removeDont: function (dont) {
            dispatch({ type: 'REMOVE_DONT', dont: dont })
        },
    }
}

function mapStateToProps(state) {
    return {
        token: state.token,
        donts: state.donts,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Donts)
