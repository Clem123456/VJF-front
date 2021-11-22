import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import RadioButtonRN from 'radio-buttons-react-native'
import { connect } from 'react-redux'

const Diet = props => {

	const diet = [
		{
			label: 'Je mange de tout',
			accessibilityLabel: 'je mange de tout',
			short: 'omni',
		},
		{
			label: 'Je suis végétarien',
			accessibilityLabel: 'Je suis végétarien',
			short: 'vegetarian',
		},
		{
			label: 'Je suis végétalien',
			accessibilityLabel: 'Je suis végétalien',
			short: 'vegan',
		},
		{
			label: 'Je mange halal',
			accessibilityLabel: 'Je suis halal',
			short: 'halal',
		},
		{
			label: 'Je mange cacher',
			accessibilityLabel: 'Je mange cacher',
			short: 'cacher',
		},
	]

	return (
		<View style={styles.container}>
			<Text h4 style={styles.sectionTitle}>
				Renseignez-nous
			</Text>
			<View style={{ marginLeft: 10 }}>
				<RadioButtonRN
					data={diet}
					activeColor="#F2A902"
					selectedBtn={e => props.addDiet(e.short)}
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
})

function mapDispatchToProps(dispatch) {
	return {
		addDiet: function (diet) {
			dispatch({ type: 'ADD_DIET', diet: diet })
		},
	}
}

function mapStateToProps(state) {
	return { diet: state.diet }
}

export default connect(mapStateToProps, mapDispatchToProps)(Diet)
