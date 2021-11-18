import React from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import { Text, Input } from 'react-native-elements'
import TopBar from '../Components/TopBar'
import NextButton from '../Components/NextButton'
import { connect } from 'react-redux'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

function SignUp(props) {
	const [signUpFirstname, setignUpFirstname] = useState('')
	const [signUpLastname, setsignUpLastname] = useState('')
	const [signUpEmail, setSignUpEmail] = useState('')
	const [signUpPassword, setSignUpPassword] = useState('')
	const [signUpPhone, setSignUpPhone] = useState('')
	const [ErrorsSignup, setErrorsSignup] = useState('')
	const [token, setToken] = useState('')

	var handleSubmitSignup = async () => {
		// send user's infos to back
		const data = await fetch(
			`https://vitejaifaimclem.herokuapp.com/users/sign-up`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: `lastNameFromFront=${signUpLastname}&firstNameFromFront=${signUpFirstname}&emailFromFront=${signUpEmail}&passwordFromFront=${signUpPassword}&phoneFromFront=${signUpPhone}`,
			}
		)
		//get answer from back
		const body = await data.json()
		if (body.result == true) {
			//set token
			setToken(body.token)
			// store token in local-storage
			AsyncStorage.setItem('token', body.token)
			// store token in redux
			props.addToken(body.token)
			props.navigation.navigate('Home', { screen: 'Home' })
		} else {
			setErrorsSignup(body.error)
		}
	}
	var skipAction = () => {
		props.navigation.navigate('Home', { screen: 'Home' })
	}
	return (
		<KeyboardAwareScrollView>
			<ScrollView>
				<View>
					<View style={{ height: 80, backgroundColor: '#27292D' }} />
					<View style={{ alignItems: 'center' }}>
						<Text
							h3
							style={{ textAlign: 'center', color: '#000000', marginTop: 15 }}
						>
							Dites-nous en plus sur vous
						</Text>

						<Input
							containerStyle={{ marginTop: 25, marginBottom: 15, width: '70%' }}
							inputStyle={{ marginLeft: 10 }}
							placeholder="Nom"
							onChangeText={text => setsignUpLastname(text)}
						/>
						<Input
							containerStyle={{ marginBottom: 15, width: '70%' }}
							inputStyle={{ marginLeft: 10 }}
							placeholder="Prénom"
							onChangeText={text => setignUpFirstname(text)}
						/>
						<Input
							containerStyle={{ marginBottom: 15, width: '70%' }}
							inputStyle={{ marginLeft: 10 }}
							placeholder="Téléphone"
							onChangeText={text => setSignUpPhone(text)}
						/>
						<Input
							containerStyle={{ marginBottom: 15, width: '70%' }}
							inputStyle={{ marginLeft: 10 }}
							placeholder="Email"
							onChangeText={text => setSignUpEmail(text)}
						/>

						<Input
							containerStyle={{ marginBottom: 15, width: '70%' }}
							inputStyle={{ marginLeft: 10 }}
							secureTextEntry
							placeholder="Password"
							onChangeText={text => setSignUpPassword(text)}
						/>
					</View>

					<View
						style={{ flexDirection: 'row', justifyContent: 'space-between' }}
					>
						<Text
							style={{
								color: '#C4C4C4',
								alignSelf: 'center',
								marginLeft: 15,
								fontSize: 20,
							}}
						>
							<View style={styles.container}>
								<TouchableOpacity onPress={skipAction}>
									<Text style={styles.text}>Skip</Text>
								</TouchableOpacity>
							</View>
						</Text>
						<NextButton title="NEXT" onPress={() => handleSubmitSignup()} />
					</View>
					<View>
						<Text style={styles.errormesssage}>{ErrorsSignup}</Text>
					</View>
				</View>
			</ScrollView>
		</KeyboardAwareScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F4F4F4',
	},
	errormesssage: {
		marginTop: 50,
		textAlign: 'center',
		color: '#FF9800',
		fontSize: 20,
	},
	text: {
		fontSize: 20,
		color: '#70726e',
	},
})

function mapDispatchToProps(dispatch) {
	return {
		addToken: function (token) {
			dispatch({ type: 'addToken', token: token })
		},
	}
}

export default connect(null, mapDispatchToProps)(SignUp)
