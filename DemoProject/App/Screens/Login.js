import React, { Component } from 'react';
import {
	Button,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import { isEmail, printLog } from '../Utils/Validators';
import { connect } from 'react-redux';
import * as actions from '../redux/Auth/AuthAction';

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			email: '',
			confirmPassword: ''
		}
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
	}

	handleChange = (name, value) => {
		printLog(name, value)
		this.setState = ({
			[name]: '2312'
		}, () => {
			printLog("Username====>", this.state.username)

		});
	}

	checkValidation = () => {
		const { username, email, password, confirmPassword } = this.state;
		printLog("Username====>", this.state.username)
		if (username === '') {
			alert('Please enter username.');
			return false;
		} else if (email === '') {
			alert('Please enter email.');
			return false;
		} else if (!isEmail(email)) {
			alert('Please enter valid email')
			return false;

		} else if (password === '') {
			alert('Please enter password.');
			return false;
		} else if (confirmPassword === '') {
			alert('Please confirm your password.');
			return false;
		}
		else if (password !== confirmPassword) {
			alert('Password and confirm password is not matching');
			return true;
		}
	}

	onLoginPress = () => {
		if (this.checkValidation()) {
			const { username, email, password } = this.state;
			const logindata = {
				username: username,
				email: email,
				password: password,

			}
			this.props.doLogin(logindata).then({

			});
		}
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

				<TextInput

					value={email}
					onChangeText={(email) => this.setState({ email })}
					numberOfLines={1}
					maxLength={40}
					style={styles.textInput}
					placeholder={'Email'}
					keyboardType={'email-address'}

				/>
				<TextInput
					placeholder={'Password'}
					secureTextEntry={true}
					numberOfLines={1}
					maxLength={20}
					onChangeText={(password) => this.setState({ password })}
					style={styles.textInput}
				/>
				<TextInput
					placeholder={'ConfirmPassword'}
					secureTextEntry={true}
					numberOfLines={1}
					maxLength={20}
					style={styles.textInput}
					onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
				/>
				<Button
					title={'Login'}
					style={{ width: '70%' }}
					onPress={this.onLoginPress} />

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
	textInput: {
		height: 45,
		width: '100%',
		backgroundColor: 'white',
		borderRadius: 10,
		marginVertical: 5
	},

});

const mapStateToProps = state => ({
	isLoading: state.auth.isLoading,
});

const mapDispatchToProps = dispatch => ({
	doLogin: data =>
		dispatch(actions.doLogin(data)),

});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Login);