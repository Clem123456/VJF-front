import React from 'react'
import { StyleSheet, View, Image, ScrollView } from 'react-native'
import { Text } from 'react-native-elements'
import NextButton from '../Components/NextButton'
import Notification from '../Components/Notification'

function FinalPage(props) {
	return (
		<View style={styles.container}>
			<Image
				source={require('../assets/VJF-logo.png')}
				style={{ width: 200, height: 200, marginTop: 100 }}
			/>

			<Text h1 style={{ textAlign: 'center', color: '#ffffff', marginTop: 50, fontWeight: '300', }}>
				BON APPETIT
			</Text>

			<Text h4 style={{ textAlign: 'center', color: '#F2A902', marginTop: 50 }}>
				Merci pour votre confiance
			</Text>
			<ScrollView style={{ marginTop: 50 }}>
				<NextButton
					title="J'ai encore faim"
					onPress={() => {
						Notification()
						props.navigation.navigate('Mood', { screen: 'Mood' })
					}}
				/>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#27292D',
	},
})

export default (FinalPage)
