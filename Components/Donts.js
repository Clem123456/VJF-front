import React, { useState } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, SafeAreaView } from 'react-native'
import { Text, Input } from 'react-native-elements'
import SmallButton from './SmallButton'
import { AntDesign } from '@expo/vector-icons'

const Donts = props => {
	const [manualDonts, setManualDonts] = useState([])
	const [showInput, setShowInput] = useState(false)
	const [manualIngredient, setManualIngredient] = useState('')
	const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

	const displayField = () => {
		setShowInput(true)
	}

	const handleManualAdd = () => {

		setManualIngredient('')
		setManualDonts(prevDonts => [...prevDonts, manualIngredient])
	}

	return (
		<SafeAreaView style={styles.container}>
			<Text h4 style={styles.sectionTitle}>
				Ce que je n'aime pas du tout :
			</Text>
			<View style={styles.ingredients}>
				<SmallButton title="oignons" value="oignons" />
				<SmallButton title="coriandre" />
				<SmallButton title="champignons" />
				<SmallButton title="chou fleur" />
				<SmallButton title="fruits de mer" />
				{manualDonts &&
					manualDonts.map((dont, idx) => (
						<SmallButton title={dont} key={idx} />
					))}
				<TouchableOpacity onPress={() => displayField()}>
					<Image
						style={styles.tinyLogo}
						source={require('../assets/plusIcon.png')}
					/>
				</TouchableOpacity>
			</View>
			{showInput && (
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					keyboardVerticalOffset={keyboardVerticalOffset}
				>
					<Input
						onChangeText={value => setManualIngredient(value)}
						value={manualIngredient}
						rightIcon={
							<AntDesign
								name="pluscircleo"
								size={24}
								color="black"
								onPress={handleManualAdd}
							/>
						}
						placeholder="Ajoutez un ingrédient"
						style={{ marginTop: 10, marginHorizontal: 10 }}
					/>
				</KeyboardAvoidingView>
			)}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
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

export default Donts
