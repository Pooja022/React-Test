import React, { Component, useState } from 'react';
import {
	Button,
	Keyboard,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { isEmail, printLog } from '../Utils/Validators';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constant from '../Utils/Constant';
import { showSnackbar } from '../Utils/Snackbar';


const Login = (props) => {

	const [userName, setUserName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [confirmPassword, setConfirmPassword] = useState();

	function checkValidation() {
		Keyboard.dismiss()
		if (userName === '') {
			showSnackbar({ text: 'Please enter firstname' });
			return false;
		} else if (email === '') {
			showSnackbar({ text: 'Please enter email.' });

			return false;
		} else if (!isEmail(email)) {
			showSnackbar({ text: 'Please enter valid email' });
			return false;
		} else if (password === '') {
			showSnackbar({ text: 'Please enter password.' });
			return false;
		} else if (confirmPassword === '') {
			showSnackbar({ text: 'Please confirm your password.' });

			return false;
		}
		else if (password !== confirmPassword) {
			alert('Password and confirm password is not matching');
			return false;
		} else {

			return true;
		}
	}


	function onLoginPress() {
		if (checkValidation()) {
			const logindata = {
				username: userName,
				email: email,
				password: password,
			}

			printLog('LoginData', JSON.stringify(logindata))

			fetch('http://68.183.48.101:3333/users/register', {
				method: "POST",
				body: JSON.stringify(logindata),
				headers: { "Content-type": "application/json" }
			})
				.then(response => response.json())
				.then(json => {
					printLog("Response Register===>", json)
					if (json.meta.status === 'fail') {
						ShowSnackbar.show('hello')
						Keyboard.dismiss();

					} else if (json.meta.status == 'ok') {
						saveUserData(json.data.user, json.data.token.token);

					}
				})
				.catch(err => console.log('Request Failed', err));

		}
	}

	const saveUserData = (userDetails, token) => {
		printLog("saveUserData", userDetails);
		printLog("token", token, token);

		try {
			AsyncStorage.setItem(Constant.USER, JSON.stringify(userDetails));
			AsyncStorage.setItem(Constant.TOKEN, JSON.stringify(token));
			goToDashboard();

		} catch (error) {
			printLog('Error in AsyncStorage=====>', error)
		}
	}

	const goToDashboard = () => {
		props.navigation.replace('Dashboard');
	}


	return (
		<View style={styles.container}>
			<Text style={styles.welcome}>
				Login
			</Text>

			<TextInput
				placeholder="Username"
				value={userName}
				onChangeText={(value) => setUserName(value)}
				numberOfLines={1}
				maxLength={15}
				style={styles.textInput}
			/>

			<TextInput

				value={email}
				onChangeText={(value) => setEmail(value)}
				numberOfLines={1}
				maxLength={40}
				style={styles.textInput}
				placeholder={'Email'}
				keyboardType={'email-address'}

			/>

			<TextInput
				value={password}
				placeholder={'Password'}
				secureTextEntry={true}
				numberOfLines={1}
				maxLength={20}
				onChangeText={(value) => setPassword(value)}
				style={styles.textInput}
			/>

			<TextInput
				value={confirmPassword}
				placeholder={'ConfirmPassword'}
				secureTextEntry={true}
				numberOfLines={1}
				maxLength={20}
				style={styles.textInput}
				onChangeText={(value) => setConfirmPassword(value)}
			/>

			<TouchableOpacity style={styles.button}
				onPress={onLoginPress}>
				<Text style={styles.text} >
					Login
				</Text>
			</TouchableOpacity>



		</View>
	);

}



const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#4F6D7A',
		paddingHorizontal: 20
	},
	welcome: {
		fontSize: 22,
		textAlign: 'center',
		margin: 10,
		color: '#F5FCFF',
		fontWeight: 'bold'
	},
	instructions: {
		textAlign: 'center',
		color: '#F5FCFF',
		marginBottom: 5,
	},
	textInput: {
		height: 45,
		width: '100%',
		backgroundColor: 'white',
		borderRadius: 10,
		marginVertical: 7,
		paddingStart: 10,
	},

	button: {
		width: '50%',
		marginTop: 30,
		backgroundColor: 'white',
		borderRadius: 10,
		alignItems: 'center',
		height: 40,
		justifyContent: 'center'
	},
	text: {
		fontSize: 16,
		textAlign: 'center',
		fontWeight: 'bold'
	},
	validationText: {
		fontSize: 15,
		textAlign: 'left',
	}
});

export default Login;