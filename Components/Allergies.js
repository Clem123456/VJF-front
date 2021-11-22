import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Button } from 'react-native-elements'


const Allergies = props => {

	const handleAllergies = () => {
		props.setOverlay(true)
	}

	return (
		<View style={styles.container}>
			<Text h4 style={styles.sectionTitle}>
				J'ai des allergies :
			</Text>
			<View
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
				}}
			>
				<Button
					title="Oui"
					buttonStyle={{
						backgroundColor: '#F2A902',
						borderRadius: 5,
					}}
					containerStyle={{
						width: 50,
						marginRight: 20,
					}}
					onPress={() => handleAllergies()}
				/>
				<Button
					title="Non"
					buttonStyle={{
						backgroundColor: '#B5B0AA',
						borderRadius: 5,
					}}
					containerStyle={{
						width: 50,
					}}
				/>
			</View>
		</View>
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
	sectionTitle: {
		marginBottom: 10,
		marginTop: 10,
		textAlign: 'center',
	},
	button: {
		backgroundColor: '#F2A902',
		borderRadius: 5,
		color: '#fff',
	},
	ingredients: {
		marginLeft: 10,
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	tinyLogo: {
		width: 50,
		height: 50,
	},
})

export default Allergies
