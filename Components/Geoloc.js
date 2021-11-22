import React, { useState, useEffect } from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux'
import * as Location from 'expo-location'

function Geoloc(props) {
	const [displayCurrentAddress, setDisplayCurrentAddress] = useState('')
	const token = props.token
	var addressComplete

	useEffect(() => {
		async function askPermissions() {
			var { status } = await Location.requestForegroundPermissionsAsync()
			if (status === 'granted') {
				let { coords } = await Location.getCurrentPositionAsync()
				if (coords) {
					const { latitude, longitude } = coords
					props.addCoords(latitude, longitude)
					let response = await Location.reverseGeocodeAsync({
						latitude,
						longitude,
					})
					for (let item of response) {
						let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`
						setDisplayCurrentAddress(address)
						props.addAddress(address)
					}
				}
			}

			addressComplete = props.address

			await fetch(`https://vitejaifaimclem.herokuapp.com/users/update-useraddress/${token}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: `address=${props.address}`,
			})
		}
		askPermissions()


	}, [])



	return <Text>{displayCurrentAddress}</Text>
}

function mapDispatchToProps(dispatch) {
	return {
		addCoords: function (lat, lng) {
			dispatch({ type: 'STORE_COORD', payload: { lat, lng } })
		},
		addAddress: function (address) {
			dispatch({ type: 'STORE_ADDRESS', address })
		},
	}
}

function mapStateToProps(state) {
	return {
		coords: state.coords,
		address: state.address,
		token: state.token
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Geoloc)
