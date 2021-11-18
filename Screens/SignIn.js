import React from 'react'
import {
	StyleSheet,
	View,
	ScrollView,
	TouchableOpacity,
	ImageBackground,
	Image,
} from 'react-native'
import { Text, Input, SocialIcon, Button } from 'react-native-elements'
import TopBar from '../Components/TopBar'
import NextButton from '../Components/NextButton'
import { connect } from 'react-redux'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AntDesign } from '@expo/vector-icons'

function SignIn(props) {
	const [signUpEmail, setSignUpEmail] = useState('')
	const [signUpPassword, setSignUpPassword] = useState('')
	const [ErrorsSignin, setErrorsSignin] = useState('')
	const [token, setToken] = useState('')

	var handleSubmitSignin = async () => {
		// send user's infos to back
		const data = await fetch(
			`https://vitejaifaimclem.herokuapp.com/users/sign-in`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: `emailFromFront=${signUpEmail}&passwordFromFront=${signUpPassword}`,
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
			props.addFirstName(body.user.firstName)
			props.navigation.navigate('Mood', { screen: 'Mood' })
		} else {
			setErrorsSignin(body.error)
		}
	}

	var goSignup = () => {
		props.navigation.navigate('SignUp', { screen: 'SignUp' })
	}

	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				marginTop: 60,
				justifyContent: 'center',
				backgroundColor: '#27292D',
			}}
		>
			<Image style={styles.logo} source={require('./../assets/VJF-logo.png')} />
			<View style={styles.content}>
				<Text style={styles.title}>Connexion</Text>

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
				<View
					style={{
						alignSelf: 'center',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						marginBottom: 50,
					}}
				>
					<NextButton title="LOGIN" onPress={() => handleSubmitSignin()} />
					<Text style={{ marginBottom: 3 }}>ou</Text>
					<Button
						icon={<AntDesign name="google" size={24} color="white" />}
						title="Login with Google"
						buttonStyle={{
							backgroundColor: '#DB1919',
							padding: 10,
							width: 200,
							borderRadius: 5,
							marginBottom: 10,
						}}
					/>
					<Button
						icon={<AntDesign name="facebook-square" size={24} color="white" />}
						title="Login with Facebook"
						buttonStyle={{
							backgroundColor: '#3F59FF',
							padding: 10,
							width: 200,
							borderRadius: 5,
						}}
					/>
				</View>
			</View>

			<View style={styles.bottom}>
				<Text style={{ textAlign: 'center', color: '#ffffff' }}>
					Pas encore de compte ?
				</Text>
				<TouchableOpacity onPress={goSignup}>
					<Text style={styles.text}>Continuer pour vous enregister</Text>
				</TouchableOpacity>
			</View>
			<View>
				<Text style={styles.errormesssage}>{ErrorsSignin}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	errormesssage: {
		marginTop: 50,
		textAlign: 'center',
		color: '#FF9800',
		fontSize: 20,
	},
	text: {
		fontSize: 20,
		color: '#F2A902',
		fontWeight: '700',
		textAlign: 'center',
	},
	title: {
		color: '#F2A902',
		textTransform: 'uppercase',
		fontWeight: '300',
		fontSize: 24,
		marginBottom: 20,
	},
	content: {
		alignItems: 'center',
		backgroundColor: '#ffffff',
		width: '85%',
		paddingTop: 20,
		paddingLeft: 20,
		paddingRight: 20,
		borderRadius: 10,
		alignSelf: 'center',
		marginVertical: 20,
	},
	logo: {
		height: 70,
		width: 70,
	},
})

function mapDispatchToProps(dispatch) {
	return {
		addToken: function (token) {
			dispatch({ type: 'addToken', token: token })
		},
		addFirstName: function (firstName) {
			dispatch({ type: 'addFirstName', firstName: firstName })
		},
	}
}

export default connect(null, mapDispatchToProps)(SignIn)
