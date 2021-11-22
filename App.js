// Modules Import
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import diet from './reducers/diet' /*importe la fonction exportée par notre reduceur*/
import token from './reducers/token' /*import token from reducer*/
import donts from './reducers/donts'
import allergies from './reducers/allergies'
import budget from './reducers/budget'
import mood from './reducers/mood'
import order from './reducers/order'
import coords from './reducers/coords'
import address from './reducers/address'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { createDrawerNavigator } from '@react-navigation/drawer'

// Screens Import
import FirstScreen from './Screens/FirstScreen'
import Home from './Screens/Home'
import SignUp from './Screens/SignUp'
import Mood from './Screens/Mood'
import Favorites from './Screens/Favorites'
import SignIn from './Screens/SignIn'
import LastOrderScreen from './Screens/LastOrderScreen'
import UserPage from './Screens/UserPage'
import TimeToPay from './Screens/TimeToPay'
import History from './Screens/History'
import Donts from './Screens/Donts'
import Livraison from './Screens/Livraison'
import FinalPage from './Screens/FinalPage'
import CustomDrawer from './Components/CustomDrawer'
import Allergies from './Screens/Allergies'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()
const store = createStore(
	combineReducers({
		diet,
		token,
		donts,
		allergies,
		budget,
		mood,
		order,
		coords,
		address,
	})
)
//stripe


const DrawerNav = props => {
	return (
		<Drawer.Navigator
			screenOptions={{
				headerShown: false,
				drawerStyle: { backgroundColor: '#FFC901' },
				drawerLabelStyle: { color: '#000000', fontSize: 16 },
				drawerPosition: 'right',
			}}
			drawerContent={props => <CustomDrawer {...props} />}
		>
			<Drawer.Screen
				name="StackNav"
				component={StackNav}
				options={{
					drawerLabel: () => null,
					title: null,
					drawerIcon: () => null,
					drawerActiveTintColor: '#FFC901',
				}}
			/>
			<Drawer.Screen name="COMMANDEZ A MANGER" component={Mood} />
			<Drawer.Screen name="Ma dernière commande" component={LastOrderScreen} />
			<Drawer.Screen name="Mes Favoris" component={Favorites} />
			<Drawer.Screen name="Historique" component={History} />
			<Drawer.Screen name="Infos Perso" component={UserPage} />
			<Drawer.Screen name="Allergies" component={Allergies} />
			<Drawer.Screen name="Donts" component={Donts} />
		</Drawer.Navigator>
	)
}

const StackNav = props => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="First" component={FirstScreen} />
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="Mood" component={Mood} />
			<Stack.Screen name="SignUp" component={SignUp} />
			<Stack.Screen name="SignIn" component={SignIn} />
			<Stack.Screen name="Livraison" component={Livraison} />
			<Stack.Screen name="FinalPage" component={FinalPage} />
			<Stack.Screen name="TimeToPay" component={TimeToPay} />
			<Stack.Screen name="LastOrderScreen" component={LastOrderScreen} />
		</Stack.Navigator>
	)
}

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name="Drawer" component={DrawerNav} />
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}

