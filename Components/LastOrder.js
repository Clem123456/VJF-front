import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import { Text, Input } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'
import { MY_IP } from '@env'

const LastOrder = props => {
	const [meal, setMeal] = useState('')
	const [restaurant, setRestaurant] = useState('')
	const [hasOrder, setHasOrder] = useState(true)

	useEffect(() => {
		// Fetch data to get last order
		const token = props.token
		console.log('token : ', token)
		const fetchUser = async () => {
			try {
				const data = await fetch(`http://${MY_IP}:3000/orders/recap/${token}`)
				const lastOrder = await data.json()
				if (!lastOrder) setLastOrder(false)

				setMeal(lastOrder.mealName)
				setRestaurant(lastOrder.restaurant)
			} catch (err) {
				console.log(err.message)
			}
		}
		if (token) {
			fetchUser()
		} else {
			setHasOrder(false)
		}
	}, [])

	return (
		<View style={styles.container}>
			<Text h4 style={styles.text}>
				{meal}
			</Text>
			<Text style={styles.text}>
				{hasOrder ? `de : ${restaurant}` : "Vous n'avez pas encore commandé"}
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
		marginVertical: 3,
	},
})

function mapStateToProps(state) {
	return {
		token: state.token,
	}
}

export default connect(mapStateToProps, null)(LastOrder)
