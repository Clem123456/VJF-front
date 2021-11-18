import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'

const Address = props => {
	const [address, setAddress] = useState('')

	useEffect(() => {
		const token = props.token
		const fetchUser = async () => {
			const data = await fetch(
				`https://vitejaifaimclem.herokuapp.com/users/me/${token}`
			)
			const user = await data.json()
			setAddress(user.userInfo.adresse[0])
		}
		fetchUser()
	}, [])

	return (
		<View style={styles.container}>
			<Text h4 style={styles.text}>
				Adresse de livraison :
			</Text>
			<Text style={styles.text}>{props.address}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFFFFF',
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 10,
		margin: 15,
		borderColor: '#F2A902',
	},
	text: {
		textAlign: 'center',
		marginVertical: 3,
	},
})

function mapStateToProps(state) {
	return {
		token: state.token,
		address: state.address,
	}
}

export default connect(mapStateToProps, null)(Address)
