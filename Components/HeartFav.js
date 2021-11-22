import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { useIsFocused } from '@react-navigation/core'

function HeartFav(props) {

	const [isFaved, setIsFaved] = useState(false)
	const isFocused = useIsFocused()

	useEffect(() => {
		setIsFaved(false)
	}, [isFocused])

	const addToFavorite = async () => {
		setIsFaved(true)
		updateUser()
	}

	const updateUser = async () => {
		try {
			const token = props.token
			const mealId = props.mealId
			const data = await fetch(
				`https://vitejaifaimclem.herokuapp.com/users/favorites`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					body: `token=${token}&meal_id=${mealId}`,
				}
			)
			const result = await data.json()
		} catch (err) {
		}
	}

	if (isFaved == true) {
		var heartPlusColor = { color: 'red' }
	} else {
		var heartPlusColor = { color: 'black' }
	}

	return (
		<View >
			<MaterialCommunityIcons style={heartPlusColor} name="heart-plus" size={24} onPress={() => addToFavorite('ajout fav')} />
		</View >
	)
}

function mapStateToProps(state) {
	return {
		token: state.token,
	}
}

export default connect(mapStateToProps, null)(HeartFav)
