import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Input } from 'react-native-elements'
import TopBar from '../Components/TopBar';
import NextButton from '../Components/NextButton';

import { connect } from 'react-redux';



export default function SignUp(props) {


    return (
        <View >
            <TopBar />
            <View >
                <Text h3 style={{ textAlign: 'center', color: '#000000', marginTop: 15 }}>Dites-nous en plus sur vous</Text>
                <Input
                    containerStyle={{ marginTop: 25, marginBottom: 15, width: '70%' }}
                    inputStyle={{ marginLeft: 10 }}
                    placeholder='Nom'
                // onChangeText={(val) => set(val)}
                />
                <Input
                    containerStyle={{ marginBottom: 15, width: '70%' }}
                    inputStyle={{ marginLeft: 10 }}
                    placeholder='Prénom'
                // onChangeText={(val) => set(val)}
                />
                <Input
                    containerStyle={{ marginBottom: 15, width: '70%' }}
                    inputStyle={{ marginLeft: 10 }}
                    placeholder='Téléphone'
                // onChangeText={(val) => set(val)}
                />
                <Input
                    containerStyle={{ marginBottom: 15, width: '70%' }}
                    inputStyle={{ marginLeft: 10 }}
                    placeholder='Email'
                // onChangeText={(val) => set(val)}
                />
                <Input
                    containerStyle={{ marginBottom: 25, width: '70%' }}
                    inputStyle={{ marginLeft: 10 }}
                    placeholder='Password'
                // onChangeText={(val) => set(val)}
                />

                <Text style={{ color: '#000000' }}>
                    Skip
                </Text>

                <NextButton title="NEXT" />
            </View>
        </View>
    );
}

// style={styles.container}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },


});

// input: {
//     alignContent: 'center',
//     marginLeft: 10,
//     marginBottom: 25, width: '70%'
// },