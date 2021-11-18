import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import { connect } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'

const OrderRecap = props => {
	const [price, setPrice] = useState(0)
	const [quantity, setQuantity] = useState(0)
	const isFocused = useIsFocused()

	useEffect(() => {
		// Fetch data to get last order
		const token = props.token
		const fetchUser = async () => {
			const data = await fetch(
				`https://vitejaifaimclem.herokuapp.com/orders/recap/${token}`
			)
			const user = await data.json()
			setPrice(user.orderPrice)
			setQuantity(user.nbPortions)
		}
		fetchUser()
	}, [isFocused])

	return (
		<View style={styles.container}>
			<Text h4 style={styles.text}>
				Vous allez recevoir
			</Text>
			<Text h4 style={styles.textBold}>
				{quantity} x PLAT MYSTERE
			</Text>
			<Text h5 style={{ textAlign: 'center', marginVertical: 10 }}>
				Prix unitaire : {price} €
			</Text>
			<Text
				h4
				style={{ textAlign: 'center', marginVertical: 10, fontWeight: '700' }}
			>
				Prix total : {price * quantity} €
			</Text>
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
		marginVertical: 5,
	},
	textBold: {
		textAlign: 'center',
		marginVertical: 3,
		fontWeight: '700',
	},
})

function mapStateToProps(state) {
	return {
		quantity: state.quantity,
		token: state.token,
	}
}

export default connect(mapStateToProps, null)(OrderRecap)
