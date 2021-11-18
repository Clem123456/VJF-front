import React, { useState, useEffect } from 'react'
import TopBar from '../Components/TopBar'
import { StyleSheet, ScrollView } from 'react-native'
import { Button, Text, Card, Overlay } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import DietRadios from '../Components/MyRadio'

function UserPage(props) {
	const [user, setUser] = useState('')
	const token = props.token
	const [diet, setDiet] = useState('')
	const [overlayVisible, setOverlayVisible] = useState(false)

	useEffect(() => {
		async function loadUser() {
			try {
				var rawResponse = await fetch(
					`https://vitejaifaimclem.herokuapp.com/users/me/${token}`
				)
				var response = await rawResponse.json()
				setUser(response.userInfo)
			} catch (err) {
				console.log(err)
			}
		}
		loadUser()
	})

	useEffect(() => {
		const updateDiet = async () => {
			try {
				const dataToSend = {
					token: token,
					diet: props.diet,
				}

				const requestOptions = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(dataToSend),
				}
				const data = await fetch(
					`https://vitejaifaimclem.herokuapp.com/users/update-diet`,
					requestOptions
				)
				const result = await data.json()
			} catch (err) {
				console.log(err)
			}
		}
		updateDiet()
	})

	const handleDiet = () => {
		setOverlayVisible(true)
	}

	return (
		<ScrollView>
			<TopBar navigation={props.navigation} />
			<Text
				h3
				style={{
					alignSelf: 'center',
					marginTop: 15,
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
				<Card.Title style={{ marginBottom: 0 }}>
					{' '}
					Régime alimentaire:
				</Card.Title>
				<Text>{user.regimeAlim} </Text>
				<Button
					type="clear"
					onPress={handleDiet}
					icon={<Ionicons size={25} name="create-outline" color="#FFC901" />}
				/>
			</Card>
			<Overlay
				isVisible={overlayVisible}
				onBackdropPress={() => setOverlayVisible(false)}
				overlayStyle={{
					width: '90%',
					marginTop: 60,
					marginBottom: 50,
					paddingVertical: 20,
				}}
			>
				<Text style={{ textAlign: 'center', fontSize: 20, marginBottom: 20 }}>
					Changer mon régime alimentaire
				</Text>
				<DietRadios />
			</Overlay>
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
		address: state.address,
		diet: state.diet,
	}
}

export default connect(mapStateToProps, null)(UserPage)
