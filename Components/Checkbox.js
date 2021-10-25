import React, { useState } from 'react'
import { CheckBox } from 'react-native-elements'

const MyCheckbox = ({ title, checkStatus }) => {
	const [check, setCheck] = useState(checkStatus)

	const [oneCheck, setOneCheck] = useState(false)

	const handleCheck = () => {
		setCheck(!check)
		setOneCheck(true)
	}

	return (
		<CheckBox
			title={title}
			checkedColor="#FFC901"
			checked={check}
			onPress={() => handleCheck()}
		/>
	)
}

export default MyCheckbox