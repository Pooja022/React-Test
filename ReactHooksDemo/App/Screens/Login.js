import React, { Component } from 'react';
import {
	Button,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { isEmail, printLog } from '../Utils/Validators';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constant from '../Utils/Constant';


class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			email: '',
			confirmPassword: '',
			isEmailValid: true,
			isPasswordMatch: true,
			isUserNameValid: true,
			isPasswordValid: true,
			isConfirmPassValid: true
		}
	}


	checkValidation() {
		const { username, email, password, confirmPassword } = this.state;
		if (username === '') {
			//alert('Please enter username.');
			this.setState({
				isUserNameValid: false
			});
			return false;
		} else if (email === '') {
			//alert('Please enter email.');
			this.setState({
				isUserNameValid: true,
				isEmailValid: false
			});
			return false;
		} else if (!isEmail(email)) {
			//alert('Please enter valid email')
			this.setState({
				isUserNameValid: true,
				isEmailValid: false
			});
			return false;

		} else if (password === '') {
			//alert('Please enter password.');
			this.setState({
				isUserNameValid: true,
				isEmailValid: true,
				isPasswordValid: false,
			});
			return false;
		} else if (confirmPassword === '') {
			//alert('Please confirm your password.');
			this.setState({
				isUserNameValid: true,
				isEmailValid: true,
				isPasswordValid: true,
				isConfirmPassValid: false
			});
			return false;
		}
		else if (password !== confirmPassword) {
			//alert('Password and confirm password is not matching');
			this.setState({
				isUserNameValid: true,
				isEmailValid: true,
				isPasswordValid: true,
				isConfirmPassValid: true,
				isPasswordMatch: false
			});
			return false;
		} else {
			this.setState({
				isUserNameValid: true,
				isEmailValid: true,
				isPasswordValid: true,
				isConfirmPassValid: true,
				isPasswordMatch: true
			});
			return true;
		}
	}

	onLoginPress = () => {
		//this.goToDashboard();
		if (this.checkValidation()) {
			const { username, email, password } = this.state;
			const logindata = {
				username: username,
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
						alert(json.meta.message)

					} else if (json.meta.status == 'ok') {
						this.saveUserData(json.data.user, json.data.token.token);

					}
				})
				.catch(err => console.log('Request Failed', err));

		}
	}

	saveUserData = (userDetails, token) => {
		printLog("saveUserData", userDetails);
		printLog("token", token, token);

		try {
			AsyncStorage.setItem(Constant.USER, JSON.stringify(userDetails));
			AsyncStorage.setItem(Constant.TOKEN, JSON.stringify(token));
			this.goToDashboard();

		} catch (error) {
			printLog('Error in AsyncStorage=====>', error)
		}
	}

	goToDashboard = () => {
		this.props.navigation.replace('Dashboard');
	}

	render() {
		const { username, email, password, confirmPassword } = this.state
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>
					Login
        		</Text>

				<TextInput
					placeholder="Username"
					value={username}
					onChangeText={(username) => this.setState({ username })}
					numberOfLines={1}
					maxLength={15}
					style={styles.textInput}
				/>
				{!this.state.isUserNameValid && <Text style={styles.validationText}>Please enter username</Text>}


				<TextInput

					value={email}
					onChangeText={(email) => this.setState({ email })}
					numberOfLines={1}
					maxLength={40}
					style={styles.textInput}
					placeholder={'Email'}
					keyboardType={'email-address'}

				/>
				{!this.state.isEmailValid && <Text style={styles.validationText}>Please enter valid email</Text>}

				<TextInput
					value={password}
					placeholder={'Password'}
					secureTextEntry={true}
					numberOfLines={1}
					maxLength={20}
					onChangeText={(password) => this.setState({ password })}
					style={styles.textInput}
				/>
				{!this.state.isPasswordValid && <Text style={styles.validationText}>Please enter password</Text>}

				<TextInput
					value={confirmPassword}
					placeholder={'ConfirmPassword'}
					secureTextEntry={true}
					numberOfLines={1}
					maxLength={20}
					style={styles.textInput}
					onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
				/>
				{!this.state.isConfirmPassValid && <Text style={styles.validationText}>Please confirm your password</Text>}
				{!this.state.isPasswordMatch && <Text style={styles.validationText}>Your password is not matching with confirm password. </Text>}

				<TouchableOpacity style={styles.button}
					onPress={this.onLoginPress}>
					<Text style={styles.text} >
						Login
					</Text>
				</TouchableOpacity>



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