import React, { useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Overlay } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TopBar from '../Components/TopBar'
import Diet from '../Components/Diet'
import Donts from '../Components/Donts'
import Allergies from '../Components/Allergies'
import NextButton from '../Components/NextButton'
import { connect } from 'react-redux'
import MyCheckbox from '../Components/Checkbox'

const Home = props => {
	const token = props.token
	const [overlay, setOverlay] = useState(false)

	const handleAllergies = allergy => {
		setOverlay(false)
	}

	const handleSubmitFoodProfile = async () => {
		try {
			if (!token) {
				props.navigation.navigate('SignUp', {
					screen: 'SignUp',
				})
				return
			}
			const dataToUpdate = {
				diet: props.diet,
				dont: props.donts,
				allergies: props.allergies,
			}

			const requestOptions = {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(dataToUpdate)
			}
			const data = await fetch(
				`https://vitejaifaimclem.herokuapp.com/users/update-me/${token}`,
				requestOptions
			)
			const result = await data.json()
			props.navigation.navigate('Mood', {
				screen: 'Mood',
			})
		} catch (err) {

		}
	}

	return (
		<View style={styles.container}>
			<TopBar navigation={props.navigation} />
			<KeyboardAwareScrollView>
				<Diet />
				<Donts />
				<Allergies overlay={overlay} setOverlay={setOverlay} />
				<View style={{ alignSelf: 'flex-end' }}>
					<NextButton
						title="CONTINUER"
						color="#F2A902"
						width="200"
						onPress={handleSubmitFoodProfile}
					/>
				</View>
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
					</ScrollView>
					<NextButton title="VALIDER" onPress={() => handleAllergies()} />
				</Overlay>
			</KeyboardAwareScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F4F4F4',
	},
})

function mapStateToProps(state) {
	return {
		diet: state.diet,
		token: state.token,
		donts: state.donts,
		allergies: state.allergies,
	}
}

export default connect(mapStateToProps, null)(Home)
