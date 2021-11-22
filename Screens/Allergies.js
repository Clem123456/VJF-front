
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { ScrollView, Image, TouchableOpacity, View, StyleSheet } from 'react-native'
import { Button, Text } from 'react-native-elements'
import TopBar from '../Components/TopBar'
import { Ionicons } from '@expo/vector-icons'
import { Overlay } from 'react-native-elements'
import MyCheckbox from '../Components/Checkbox'
import NextButton from '../Components/NextButton'
import { useIsFocused } from '@react-navigation/native'

function Allergies(props) {
	const token = props.token
	const [allergies, setAllergies] = useState([])
	const [allergyExist, setAllergyExist] = useState(false)
	const [overlay, setOverlay] = useState(false)
	const isFocused = useIsFocused()

	var allergiesRender

	//affichage des allergies
	useEffect(() => {
		async function loadAllergies() {

			var rawResponse = await fetch(`https://vitejaifaimclem.herokuapp.com/users/allergies/${token}`)
			var response = await rawResponse.json()

			if (response.allergies.length > 0 && response.allergies[0] !== null) {
				setAllergyExist(true)
				setAllergies(response.allergies)
				response.allergies.map((allergy) => {
					props.addAllergy(allergy)
				})
			}
		}
		loadAllergies()
	}, [isFocused])

	if (allergyExist) {
		allergiesRender = allergies.map((allergy, i) => {
			return (
				< View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25, marginBottom: 25 }} key={i}>
					<Text style={{ alignSelf: 'center' }}>{allergy}</Text>
					<Button
						title=""
						type="clear"
						onPress={() => { handleAllergyDeletion(allergy) }}
						icon={<Ionicons size={25} name="trash-outline" color="#000000" />} />
				</View >
			)
		})
	} else {
		allergiesRender = (
			<Text style={{ alignSelf: 'center', marginTop: 25, marginBottom: 15 }}>
				Vous n'avez pas d'allergie renseignée
			</Text>
		)
	}

	//ajout d'allergie
	async function handleAllergies() {
		setOverlay(false)

		const dataToUpdate = {
			allergies: props.allergies,
		}
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(dataToUpdate),
		}
		const data = await fetch(
			`https://vitejaifaimclem.herokuapp.com/users/update-me/${token}`,
			requestOptions
		)
		const result = await data.json()
		console.log('doc allergies', result.doc.allergies)

		setAllergies(result.doc.allergies)
	}

	//suppession d'allergie
	async function handleAllergyDeletion(allergy) {

		var allergyFilter = allergies.filter(e => e !== allergy)
		setAllergies(allergyFilter)
		props.removeAllergy(allergy)

		var rawResponse = await fetch(
			`https://vitejaifaimclem.herokuapp.com/users/delallergies/${token}/${allergy}`,
			{
				method: 'DELETE',
			}
		)
		var response = await rawResponse.json()

		if (response.allergies.allergies.length == 0) {
			setAllergyExist(false)
		}
	}

	return (
		<View style={styles.container}>
			<TopBar navigation={props.navigation} />
			<ScrollView >
				<Text h3 style={{ color: '#F2A902', textAlign: 'center', marginTop: "4%" }}>Allergies</Text>
				<ScrollView style={styles.userAllergies}>
					{allergiesRender}
				</ScrollView>
				<Overlay
					isVisible={overlay}
					onBackdropPress={() => setOverlay(false)}
					overlayStyle={{
						width: '90%',
						marginTop: 60,
						marginBottom: 50,
						paddingVertical: 20,
					}}
				>
					<ScrollView>
						<MyCheckbox title="Gluten" isAllergy={true} />
						<MyCheckbox title="Sesame" isAllergy={true} />
						<MyCheckbox title="Fruits à coque" isAllergy={true} />
						<MyCheckbox title="Crustacés" isAllergy={true} />
						<MyCheckbox title="Oeuf" isAllergy={true} />
						<MyCheckbox title="Poisson" isAllergy={true} />
						<MyCheckbox title="Moutarde" isAllergy={true} />
						<MyCheckbox title="Lait" isAllergy={true} />
						<MyCheckbox title="Celeri" isAllergy={true} />
						<MyCheckbox title="Arachides" isAllergy={true} />
						<MyCheckbox title="Soja" isAllergy={true} />
						<MyCheckbox title="Mollusques" isAllergy={true} />
						<MyCheckbox title="Lupin" isAllergy={true} />
						<MyCheckbox title="Sulfites" isAllergy={true} />

						<NextButton title="VALIDER" onPress={() => handleAllergies()} />
					</ScrollView>
				</Overlay>
				<TouchableOpacity onPress={() => setOverlay(true)}>
					<Image
						style={{ width: 50, height: 50, alignSelf: 'center' }}
						source={require('../assets/plusIcon.png')}
					/>
				</TouchableOpacity>
			</ScrollView>
		</View >
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F4F4F4',
	},
	userAllergies: {
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
	}
})

function mapDispatchToProps(dispatch) {
	return {
		addAllergy: function (allergy) {
			dispatch({ type: 'ADD_ALLERGY', allergy })
		},
		removeAllergy: function (allergy) {
			dispatch({ type: 'REMOVE_ALLERGY', allergy })
		},
	}
}

function mapStateToProps(state) {
	return {
		token: state.token,
		allergies: state.allergies,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Allergies)
