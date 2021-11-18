import React, { useState } from 'react'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'

const SmallButton = ({ title, addDont, removeDont, donts }) => {
	const ingredient = title
	const [disabled, setDisabled] = useState(false)

	const handleDont = ingredient => {
		if (!donts.includes(ingredient)) {
			addDont(ingredient)
		}
		if (disabled) {
			removeDont(ingredient)
		}
		setDisabled(!disabled)
	}

	return (
		<Button
			title={title}
			buttonStyle={{
				backgroundColor: disabled ? '#F2A902' : '#000',
				borderRadius: 25,
				size: 10,
				margin: 5,
				paddingHorizontal: 10,
			}}
			onPress={() => handleDont(ingredient)}
		/>
	)
}

function mapDispatchToProps(dispatch) {
	return {
		addDont: function (dont) {
			dispatch({ type: 'ADD_DONT', newDont: dont })
		},
		removeDont: function (dont) {
			dispatch({ type: 'REMOVE_DONT', dont: dont })
		},
	}
}

function mapStateToProps(state) {
	return { donts: state.donts }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmallButton)