import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign } from '@expo/vector-icons'

const NextButtonFullSize = ({ title, onPress }) => {
	return (
		<LinearGradient
			colors={['#F2A902', '#FFC901']}
			start={{ x: 0.1, y: 0 }}
			end={{ x: 1, y: 0 }}
			style={styles.button}
		>
			<TouchableOpacity
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center'
				}}
				onPress={onPress}
			>
				<Text style={title == "VITE J'AI FAIM" ? styles.big : styles.text}>
					{title}
				</Text>
				<AntDesign name="arrowright" size={24} color="white" />
			</TouchableOpacity>
		</LinearGradient>
	)
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#F2A902',
		borderRadius: 5,
		width: 330,
		paddingHorizontal: 10,
		paddingVertical: 10,
		textAlign: 'center',
		alignSelf: 'center',
		marginBottom: 20
	},
	text: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '700',
		flex: 1,
		textAlign: 'center',
	},
	big: {
		color: '#fff',
		fontSize: 24,
		fontWeight: '500',
		flex: 1,
		textAlign: 'center',
	},
})

export default NextButtonFullSize
