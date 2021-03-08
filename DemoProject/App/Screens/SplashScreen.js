import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	StatusBar
} from 'react-native';
import { StackActions } from '@react-navigation/native';



export default class SplashScreen extends Component {

	componentDidMount(){
		this.moveToLogin();
	}

	moveToLogin = () => {
		setTimeout(()=>{
			this.props.navigation.navigate('Dashboard');
		},1000)
	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBar
					barStyle="light-content"
					backgroundColor="#4F6D7A"
				/>
				<Text style={styles.welcome}>
					Welcome to React Native!
        </Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#4F6D7A',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
		color: '#F5FCFF',
	},
	instructions: {
		textAlign: 'center',
		color: '#F5FCFF',
		marginBottom: 5,
	},
});