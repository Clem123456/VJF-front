import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
	View,
	StyleSheet,
	Image,
	KeyboardAvoidingView,
	TouchableOpacity,
} from 'react-native'
import { Text, Input, Overlay } from 'react-native-elements'
import TopBar from '../Components/TopBar'
import { MY_IP } from '@env'
import LastOrder from '../Components/LastOrder'

const LastOrderScreen = props => {
	const [overlay, setOverlay] = useState(false)
	const [choice, setChoice] = useState('')

	const handleThumbClick = async choice => {
		setChoice(choice)
		setOverlay(true)
		if (choice === 'good') updateUser()
	}

	const updateUser = async () => {
		try {
			const token = props.token
			const mealId = 'SOME_ID'
			console.log('fetch api')
			const data = await fetch(`http://${MY_IP}:3000/users/favorites`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: `token=${token}&meal_id=${mealId}`,
			})
			const result = await data.json()
			// console.log(result)
		} catch (err) {
			console.log(err.message)
		}
	}

	return (
		<View style={styles.container}>
			<TopBar navigation={props.navigation} />
			<Text h3 style={styles.text}>
				Votre dernière commande
			</Text>
			<LastOrder />
			<Text h4 style={styles.text}>
				Qu'en avez vous pensé ?
			</Text>
			<View
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-evenly',
					marginTop: 20,
				}}
			>
				<TouchableOpacity onPress={() => handleThumbClick('bad')}>
					<Image
						style={styles.tinyLogo}
						source={require('../assets/thumbdown.png')}
					/>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => handleThumbClick('good')}>
					<Image
						style={styles.tinyLogo}
						source={require('../assets/thumbup.png')}
						onPress={() => handleThumbClick('good')}
					/>
				</TouchableOpacity>
			</View>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			>
				<Input
					placeholder="Ajoutez un commentaire"
					style={{ marginTop: 40, marginHorizontal: 10 }}
				/>
			</KeyboardAvoidingView>
			<Overlay
				isVisible={overlay}
				onBackdropPress={() => setOverlay(false)} // REMOVE FOR PRODUCTION
				overlayStyle={{
					width: '90%',
					marginTop: 60,
					marginBottom: 50,
					paddingVertical: 20,
					textAlign: 'center',
				}}
			>
				<Text h4>Merci</Text>
				{choice === 'good' ? (
					<Text>Nous avons ajouté le plat à vos favoris</Text>
				) : (
					<Text>Vous ne recevrez plus ce plat</Text>
				)}
			</Overlay>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F4F4F4',
	},
	text: {
		textAlign: 'center',
		marginTop: 40,
	},
	tinyLogo: {
		width: 80,
		height: 80,
	},
})

function mapStateToProps(state) {
	return {
		token: state.token,
	}
}

export default connect(mapStateToProps, null)(LastOrderScreen)
