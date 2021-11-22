import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-elements'
import TopBar from '../Components/TopBar'
import { Ionicons } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'

function Favorites(props) {
	const token = props.token
	const [favData, setFavData] = useState([])
	const [FavExists, setFavExists] = useState(false)
	const isFocused = useIsFocused()

	useEffect(() => {
		async function loadFavorites() {
			var rawResponse = await fetch(
				`https://vitejaifaimclem.herokuapp.com/users/favorites/${token}`
			)
			var response = await rawResponse.json()
			setFavData(response.favorites)

			if (response.favorites.length > 0 && response.favorites[0] !== null) {
				setFavExists(true)
			}
		}

		loadFavorites()
	}, [isFocused])

	if (FavExists) {
		var favList = favData.map((fav, i) => {
			return (
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						marginTop: 25,
						marginBottom: 25,
					}}
					key={i}
				>
					<Text style={{ alignSelf: 'center' }}>
						{fav.name} {fav.price} €
					</Text>
					<Button
						title=""
						type="clear"
						onPress={() => {
							handleFavDeletion(fav._id)
						}}
						icon={<Ionicons size={25} name="trash-outline" color="#000000" />}
					/>
				</View>
			)
		})
	} else {
		var favList = (
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					marginTop: 25,
					marginBottom: 25,
				}}
			>
				<Text>Vous n'avez pas de favoris renseigné</Text>
			</View>
		)
	}

	async function handleFavDeletion(meal_id) {
		var favFilter = favData.filter(e => e._id !== meal_id)
		setFavData(favFilter)
		var rawResponse = await fetch(
			`https://vitejaifaimclem.herokuapp.com/users/favorites/${token}/${meal_id}`,
			{
				method: 'DELETE',
			}
		)
		var response = await rawResponse.json()

		if (response.favorites.length == 0) {
			setFavExists(false)
		}
	}

	return (
		<View style={styles.container}>
			<TopBar navigation={props.navigation} />
			<ScrollView>
				<Text h2 style={{ color: '#F2A902', textAlign: 'center', marginTop: '4%' }}>Favoris</Text>
				<ScrollView style={styles.userDonts}>{favList}</ScrollView>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F4F4F4',
	},
	userDonts: {
		backgroundColor: '#FFFFFF',
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 10,
		margin: 15,
		borderColor: '#F2A902',
	},
	sectionTitle: {
		marginBottom: 10,
		marginTop: 10,
		textAlign: 'center',
	},
})

function mapStateToProps(state) {
	return {
		token: state.token,
	}
}
export default connect(mapStateToProps, null)(Favorites)
