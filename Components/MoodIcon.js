import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, ImageBackground, View, Text } from 'react-native'
import { connect } from 'react-redux'

const MoodIcon = props => {
	return (
		<TouchableOpacity>
			<TouchableOpacity
				style={{
					backgroundColor: props.isSelected ? '#000000' : '#FFC901',
					height: 110,
					width: 135,
					position: 'relative',
				}}
				onPress={() => {
					props.moodHandle(props.short)
					props.handleSetSelected(props.moodId)
				}}
			>
				<ImageBackground
					source={props.background}
					style={{
						height: 110,
						width: 135,
						opacity: 0.6,
						position: 'absolute',
					}}
				/>
				<View
					style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
				>
					<Text
						style={{
							fontSize: 18,
							fontWeight: '700',
							textAlign: 'center',
							color: props.isSelected ? '#FFC901' : '#000000',
						}}
					>
						{props.title}
					</Text>
				</View>
			</TouchableOpacity>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	absoluteView: {
		flex: 1,
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#F2A902',
	},
	backgroundImage: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	itemText: {
		fontSize: 16,
		color: 'black',
	},
})

function mapDispatchToProps(dispatch) {
	return {
		moodHandle: function (mood) {
			dispatch({ type: 'moodChoice', mood })
		},
	}
}

export default connect(null, mapDispatchToProps)(MoodIcon)
