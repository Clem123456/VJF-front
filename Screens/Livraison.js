import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Text } from 'react-native-elements'
import TopBar from '../Components/TopBar'
import { useState, useEffect } from 'react'
import LottieView from 'lottie-react-native'
import CountDown from 'react-native-countdown-component'

function Livraison(props) {
	const [start, setStart] = useState(true) //const use to start the delivery process
	const [seconds, setSeconds] = useState(5) // const to set the number of seconds for setTimeout
	const [commandRender, setCommandRender] = useState('') // wich screen need to be render (preparation..livraison..)

	useEffect(() => {
		// if start = true launch delivery process
		if (start) {
			// set commandRender to order value
			setCommandRender('order')
		}
	}, [])

	// render order
	var order = (
		<View
			style={{
				display: 'flex',
				alignItems: 'center',
				marginLeft: 15,
			}}
		>
			<Text style={{ textAlign: 'left', color: '#000000', marginTop: 50 }}>
				Envoi de la commande au restaurant !
			</Text>
			<LottieView
				source={require('../assets/order.json')}
				style={styles.waiting}
				autoPlay
			/>
		</View>
	)
	// render preparation
	var preparation = (
		<View>
			<View
				style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					marginLeft: 15,
				}}
			>
				<Text style={{ textAlign: 'left', color: '#000000', marginTop: 15 }}>
					Commande validée{' '}
				</Text>
				<LottieView
					source={require('../assets/done.json')}
					autoPlay
					style={styles.done}
				/>
			</View>

			<View
				style={{
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<Text style={{ textAlign: 'center', color: '#000000', marginTop: 15 }}>
					Votre commande est en préparation !{' '}
				</Text>
				<LottieView
					source={require('../assets/prepa.json')}
					style={styles.preparation}
					autoPlay
				/>
			</View>
		</View>
	)
	// render livraison
	var livraison = (
		<View>
			<View
				style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					marginLeft: 15,
				}}
			>
				<Text style={{ textAlign: 'left', color: '#000000', marginTop: 15 }}>
					Commande validée{' '}
				</Text>
				<LottieView
					source={require('../assets/done.json')}
					autoPlay
					style={styles.done}
				/>
			</View>
			<View
				style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					marginLeft: 15,
				}}
			>
				<Text style={{ textAlign: 'left', color: '#000000', marginTop: 15 }}>
					Commande preparée
				</Text>
				<LottieView
					source={require('../assets/done.json')}
					autoPlay
					style={styles.done}
				/>
			</View>
			<Text
				style={{
					textAlign: 'center',
					color: '#000000',
					marginTop: 15,
					marginBottom: 15,
				}}
			>
				Votre commande sera livrée dans:
			</Text>
			<CountDown timeToShow={['M', 'S']} until={10} size={20} />
			<LottieView
				source={require('../assets/deliveryman.json')}
				style={styles.deliveryman}
				autoPlay
			/>
		</View>
	)
	// render done
	var done = (
		<View>
			<View
				style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					marginLeft: 15,
				}}
			>
				<Text style={{ textAlign: 'left', color: '#000000', marginTop: 15 }}>
					Commande preparée
				</Text>
				<LottieView
					source={require('../assets/done.json')}
					style={styles.done}
					autoPlay
				/>
			</View>
			<View
				style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					marginLeft: 15,
				}}
			>
				<Text style={{ textAlign: 'left', color: '#000000', marginTop: 15 }}>
					Commande livrée
				</Text>
				<LottieView
					source={require('../assets/done.json')}
					style={styles.done}
					autoPlay
				/>
			</View>
			<View>
				<Text style={{ textAlign: 'center', color: '#000000', marginTop: 40 }}>
					Toc-Toc c'est la !
				</Text>
				<LottieView
					source={require('../assets/foodishere.json')}
					style={styles.deliverymanwait}
					autoPlay
				/>
			</View>
		</View>
	)

	// var showscreen = status de la commande
	var showscreen
	if (commandRender == 'order') {
		showscreen = order
		if (seconds > 0) {
			setTimeout(() => setSeconds(seconds - 1), 1000)
		} else {
			setCommandRender('preparation')
			setSeconds(10)
		}
	}

	if (commandRender == 'preparation') {
		showscreen = preparation
		if (seconds > 0) {
			setTimeout(() => setSeconds(seconds - 1), 1000)
		} else {
			setCommandRender('livraison')
			setSeconds(10)
		}
	}

	if (commandRender == 'livraison') {
		showscreen = livraison
		if (seconds > 0) {
			setTimeout(() => setSeconds(seconds - 1), 1000)
		} else {
			setCommandRender('done')
			setSeconds(10)
		}
	}

	if (commandRender == 'done') {
		showscreen = done
		if (seconds > 0) {
			setTimeout(() => setSeconds(seconds - 1), 1000)
		} else {
			props.navigation.navigate('FinalPage', { screen: 'FinalPage' })
		}
	}

	return (
		<ScrollView>
			<View>
				<TopBar navigation={props.navigation} />
				<View style={{ marginLeft: 15, marginTop: 15 }}>
					<Text
						h3
						style={{ textAlign: 'left', color: '#000000', marginTop: 15 }}
					>
						Etapes:
					</Text>
				</View>
				<View style={{ marginLeft: 30, marginTop: 15 }}></View>
				<View>{showscreen}</View>
			</View>
		</ScrollView>
	)
}
const styles = StyleSheet.create({
	order: {
		width: 350,
		height: 350,
	},
	deliveryman: {
		width: 250,
		height: 250,
	},
	preparation: {
		width: 300,
		height: 300,
	},
	deliverymanwait: {
		width: 250,
		height: 250,
	},
	done: {
		width: 70,
		height: 70,
	},
	waiting: {
		width: 300,
		height: 300,
	},
})
export default Livraison
