import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import { useIsFocused } from '@react-navigation/native'

const LastOrder = props => {
	const token = props.token
	const [meal, setMeal] = useState('')
	const [restaurant, setRestaurant] = useState('')
	const isFocused = useIsFocused()

	useEffect(() => {
		// Fetch data to get last order		
		const fetchUser = async () => {
			try {
				const data = await fetch(
					`https://vitejaifaimclem.herokuapp.com/orders/recap/${token}`
				)
				const lastOrder = await data.json()

				if (lastOrder.message === 'no order yet') {
					props.setHasOrder(false)
				} else {
					props.setHasOrder(true)
				}

				setMeal(lastOrder.mealName)
				setRestaurant(lastOrder.restaurant)
				props.setMealId(lastOrder.mealId)
			} catch (err) { }
		}
		if (token) {
			fetchUser()
		} else {
			props.setHasOrder(false)
		}
		return () => { }
	}, [isFocused])

	return (
		<View style={styles.container}>
			<Text h4 style={styles.text}>
				{props.hasOrder ? meal : 'Oh Oh'}
			</Text>
			<Text style={styles.text}>
				{props.hasOrder
					? `de : ${restaurant}`
					: "Vous n'avez pas encore commandé"}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFC901',
		paddingVertical: 30,
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
