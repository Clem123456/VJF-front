import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Text } from 'react-native-elements'
import TopBar from '../Components/TopBar';
import Plats from '../Components/Plats';

function History(props) {

    return (

        <View style={styles.container}>
            <TopBar navigation={props.navigation} />
            <Text h2 style={{ color: '#F2A902', textAlign: 'center', marginTop: '4%' }}>Derniers Plats</Text>
            <ScrollView >
                <Plats />
            </ScrollView>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
})

export default History
