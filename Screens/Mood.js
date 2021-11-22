import React, { useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Button, Text, Input, Overlay } from 'react-native-elements'
import NumericInput from 'react-native-numeric-input'
import TopBar from '../Components/TopBar'
import NextButton from '../Components/NextButton'
import NextButtonFullSize from '../Components/NextButtonFullSize'
import { connect } from 'react-redux'
import Geoloc from '../Components/Geoloc'
import { Ionicons } from '@expo/vector-icons'
import MoodIcon from '../Components/MoodIcon'
import moodsItems from '../data/moods'
import { CheckBox } from 'react-native-elements'

function Mood(props) {
	const [overlay, setOverlay] = useState(false)
	const [addressIsChanged, setAddressIsChanged] = useState(false)
	const [numRue, setNumRue] = useState('')
	const [ville, setVille] = useState('')
	const [codePostal, setcodePostal] = useState('')
	const [errorMsg, setErrorMsg] = useState('')
	const [selectedBudget, setSelectedBudget] = useState('')
	const [portions, setPortions] = useState(1)
	const [check, setCheck] = useState(false)

	const handleSetSelected = moodId => {
		moodsItems.forEach(mood => (mood.isSelected = false))
		const mood = moodsItems.find(mood => mood.id === moodId)
		mood.isSelected = true
	}

	const changeAdress = () => {
		setOverlay(true)
	}

	const updateAdress = async () => {
		var addressComplete
		const token = props.token
		addressComplete = numRue + ',' + ville + ',' + codePostal
		props.addressHandle(addressComplete)
		await fetch(
			`https://vitejaifaimclem.herokuapp.com/users/update-useraddress/${token}`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: `address=${addressComplete}`,
			}
		)
		setOverlay(false)
		setAddressIsChanged(true)
	}
	const getFromFavorites = async () => {

		try {
			const token = props.token
			if (!token)
				setErrorMsg('Connectez-vous pour commandez votre repas surprise !')
			const data = await fetch(
				`https://vitejaifaimclem.herokuapp.com/orders/makeorderinfav/${token}`
			)
			const formatedData = await data.json()

			if (formatedData) {
				const { result, order } = formatedData
				if (result === 'success') {
					// GET THE ORDER ID
					props.orderReducer(order._id)
					props.navigation.navigate('TimeToPay', {
						screen: 'TimeToPay',
					})
				}
			}
		} catch (err) { }
	}

	const getTheSupriseMeal = async () => {
		try {
			const token = props.token
			if (!token)
				setErrorMsg('Connectez-vous pour commandez votre repas surprise !')
			const dataToSend = {
				mood: props.mood,
				minprice: props.budget[0],
				maxprice: props.budget[1],
				coords: props.coords,
				quantity: portions,
			}
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(dataToSend),
			}
			const data = await fetch(
				`https://vitejaifaimclem.herokuapp.com/orders/recap/${token}`,
				requestOptions
			)
			const formatedData = await data.json()

			if (formatedData) {
				const { result, message, order } = formatedData
				if (result === 'success' && message !== 'no meal fits') {
					// GET THE ORDER ID
					props.orderReducer(order._id)
					props.navigation.navigate('TimeToPay', {
						screen: 'TimeToPay',
					})
				} else if (result === 'success' && message === 'no meal fits') {
					setErrorMsg(
						'Désolé, nous ne trouvons aucun plat correspondant à vos critères près de vous'
					)
				}
			}
		} catch (err) { }
	}

	var checkOrNot = () => {
		if (check) {
			getFromFavorites()
		}
		else {
			getTheSupriseMeal('getSupriseMeal')
		}
	}

	var address
	if (addressIsChanged) {
		address = (
			<Text>
				{numRue}, {ville}, {codePostal}
			</Text>
		)
	} else {
		address = <Geoloc />
	}
	return (
		<View>
			<ScrollView>
				<TopBar showArrow={true} navigation={props.navigation} />
				<View style={{ alignItems: 'center' }}>
					<Text
						h3
						style={{ textAlign: 'center', color: '#000000', marginTop: 15 }}
					>
						On y est presque !
					</Text>
				</View>
				<Text
					h4
					style={{
						color: '#000000',
						fontWeight: 'bold',
						textAlign: 'center',
						marginTop: 20,
					}}
				>
					Quel est votre mood ?
				</Text>

				<View style={styles.moodContainer}>
					{moodsItems.map(mood => (
						<MoodIcon
							key={mood.id}
							moodId={mood.id}
							title={mood.name}
							short={mood.short}
							background={mood.img}
							handleSetSelected={handleSetSelected}
							isSelected={mood.isSelected}
						/>
					))}
				</View>

				<View
					style={{
						marginTop: 15,
						width: '100%',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<View
						style={{
							marginTop: 15,
							flexDirection: 'column',
							width: '90%',
							backgroundColor: '#FFFFFF',
							borderRadius: 5,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Text h4 style={{ color: '#000000', fontWeight: 'bold' }}>
							{' '}
							Budget (par portion)
						</Text>
						<View
							style={{
								marginTop: 15,
								marginBottom: 15,
								flexDirection: 'row',
								width: '90%',
								justifyContent: 'center',
								padding: 0,
								marginLeft: 2,
							}}
						>
							<Button
								onPress={() => {
									props.budgetHandle([5, 9.99])
									setSelectedBudget('5-10')
								}}
								title="5-10€"
								buttonStyle={{
									backgroundColor:
										selectedBudget === '5-10' ? '#000000' : '#FFC901',
									borderRadius: 5,
									width: 80,
									marginRight: 10,
								}}
							/>
							<Button
								onPress={() => {
									props.budgetHandle([10, 14.99])
									setSelectedBudget('10-15')
								}}
								title="10-15€"
								buttonStyle={{
									backgroundColor:
										selectedBudget === '10-15' ? '#000000' : '#F2A902',
									borderRadius: 5,
									width: 80,
									marginRight: 10,
								}}
							/>
							<Button
								onPress={() => {
									props.budgetHandle([15, 19.99])
									setSelectedBudget('15-20')
								}}
								title="15-20€"
								buttonStyle={{
									backgroundColor:
										selectedBudget === '15-20' ? '#000000' : '#C95615',
									borderRadius: 5,
									width: 80,
									marginRight: 10,
								}}
							/>
							<Button
								onPress={() => {
									props.budgetHandle([20, 2000])
									setSelectedBudget('20+')
								}}
								title="YOLO!"
								buttonStyle={{
									backgroundColor:
										selectedBudget === '20+' ? '#000000' : '#DB1919',
									borderRadius: 5,
									width: 80,
									marginRight: 10,
								}}
							/>
						</View>
					</View>

					<View>
						<Text
							h4
							style={{
								color: '#000000',
								fontWeight: 'bold',
								textAlign: 'center',
								marginTop: 20,
							}}
						>
							Nombre de personnes affamées:
						</Text>
						<View style={{ alignSelf: 'center', marginTop: 10 }}>
							<NumericInput
								value={portions}
								onChange={value => setPortions(value)}
								rounded
								rightButtonBackgroundColor="#FFC901"
								leftButtonBackgroundColor="#F2A902"
								totalHeight={45}
								totalWidth={120}
								inputStyle={{ fontWeight: '700' }}
							/>
						</View>
					</View>
					<View
						style={{
							backgroundColor: '#FFFFFF',
							marginTop: 15,
							flexDirection: 'row',
							width: '90%',
							height: 60,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Ionicons name="location-outline" size={24} color="#F2A902" />
						<View style={{ display: 'flex', flexDirection: 'column' }}>
							<Text
								style={{
									color: '#000000',
									fontWeight: 'bold',
									justifyContent: 'center',
								}}
							>
								Livré au:
							</Text>
							{address}
						</View>
						<Ionicons
							name="ellipsis-vertical"
							size={24}
							color="#F2A902"
							onPress={() => changeAdress()}
							overlay={overlay}
							setOverlay={setOverlay}
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
							<Input
								title="numRue"
								placeholder="N, rue"
								onChangeText={numRue => setNumRue(numRue)}
							/>
							<Input
								title="ville"
								placeholder="Ville"
								onChangeText={ville => setVille(ville)}
							/>
							<Input
								title="codePostal"
								placeholder="Code Postal"
								onChangeText={codePostal => setcodePostal(codePostal)}
							/>
						</ScrollView>
						<NextButton title="VALIDER" onPress={() => updateAdress()} />
					</Overlay>
					<Overlay
						isVisible={errorMsg ? true : false}
						onBackdropPress={() => setErrorMsg('')}
					>
						<Text>{errorMsg}</Text>
					</Overlay>
					<CheckBox
						title="Choisir un plat uniquement dans les favoris"
						checkedColor="#FFC901"
						checked={check}
						onPress={() => setCheck(!check)}
					/>
					<View
						style={{
							marginTop: 15,
							width: '100%',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<NextButtonFullSize title="VITE J'AI FAIM" onPress={checkOrNot} />
					</View>
				</View>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F4F4F4',
	},
	moodContainer: {
		marginTop: 15,
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		// backgroundColor: '#FFFFFF',
		borderRadius: 5,
	},
})

function mapDispatchToProps(dispatch) {
	return {
		dietHandle: function (diet) {
			dispatch({ type: 'ADD_DIET', diet })
		},
		moodHandle: function (mood) {
			dispatch({ type: 'moodChoice', mood })
		},
		budgetHandle: function (budget) {
			dispatch({ type: 'budgetChoice', budget })
		},
		orderReducer: function (orderId) {
			dispatch({ type: 'STORE_ORDER', orderId })
		},
		addressHandle: function (address) {
			dispatch({ type: 'STORE_ADDRESS', address })
		},
	}
}

function mapStateToProps(state) {
	return {
		mood: state.mood,
		budget: state.budget,
		order: state.order,
		token: state.token,
		coords: state.coords,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mood)
