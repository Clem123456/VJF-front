import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import HeartFav from '../Components/HeartFav'
import { connect } from 'react-redux'

function Plats(props) {
	const token = props.token

	const [ordersHistory, setOrdersHistory] = useState([])
	const [mealId, setMealId] = useState([])

	useEffect(() => {
		async function loadOrders() {

			var rawResponse = await fetch(
				`https://vitejaifaimclem.herokuapp.com/users/history/${token}`
			)
			var response = await rawResponse.json()

			setOrdersHistory(response.meals)
			setMealId(response.meals[1].mealId)
		}

		loadOrders()
	}, [])

	return (
		<View style={styles.container}>
			{ordersHistory.map((order, j) => (
				< View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25, marginBottom: 25 }} key={j} >
					<Text>{new Date(order.date).toLocaleDateString()}</Text>
					<Text>{order.mealName}</Text>
					<HeartFav mealId={order.mealId} />
				</View >
			))
			}
		</View >
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFFFFF',
		paddingVertical: 10,
		paddingHorizontal: 12,
		borderRadius: 10,
		margin: 15,
		borderColor: '#F2A902',
	},
})
function mapStateToProps(state) {
	return {
		token: state.token,
	}
}

export default connect(mapStateToProps, null)(Plats)
