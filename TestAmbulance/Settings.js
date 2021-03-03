/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	DeviceEventEmitter,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';


var vTimer = '';
var vAmbTimer = '';
var vRotation = 0;
export default class Settings extends Component {

	constructor(props) {
		super(props)
		this.state = {
			timer: 5,
			ambTimer: 10,
			rotationArray: [
				{
					isSelected: true,
					id: 0,
					name: 'ClockWise(Default)'
				},
				{
					isSelected: false,

					id: 1,
					name: 'AntiClockWise'
				},
				{
					isSelected: false,
					id: 2,
					name: 'Up to down Left to Right'
				},
			],
			selectedRotationValue: 0
		}
	}


	componentDidMount(){
		this.getDataFromAsyncStorage().then(()=>{
			this.selectRotation(this.state.selectedRotationValue)
		});
	}

	componentWillUnmount() {
		DeviceEventEmitter.emit('updateDataFromAsync')
	}

	getDataFromAsyncStorage = async () => {
		try {
			vTimer = await AsyncStorage.getItem('TIMER');
			vAmbTimer = await AsyncStorage.getItem('AMBTIMER');
			vRotation = await AsyncStorage.getItem('ROTATIONVALUE');

			if (vTimer != null) {
				this.setState({
					timer: Number(vTimer)
				})
			}

			if (vAmbTimer != null) {
				this.setState({
					ambTimer: Number(vAmbTimer)
				}, () => { console.log(this.state.ambTimer); })
			}

			if (vRotation != null) {
				this.setState({
					selectedRotationValue: vRotation
				})
			}


		} catch (e) {
			console.log('getDataFromAsyncStorage', e);
		}
	}

	storeData = async () => {


		if (this.state.timer > 120) {
			alert('Please enter  timer value less then 120 seconds')

			return;
		}

		if (this.state.timer < 5) {
			alert('Please enter timer value greter  then 5 seconds')

			return;
		}

		if (this.state.ambTimer > 300) {
			alert('Please enter ambulance timer value less then 300 seconds')

			return;
		}

		if (this.state.ambTimer < 10) {
			alert('Please enter ambulance timer value more then 10 seconds')
			return
		}


		try {
			await AsyncStorage.setItem('TIMER', JSON.stringify(this.state.timer));
			await AsyncStorage.setItem('AMBTIMER', JSON.stringify(this.state.ambTimer));
			await AsyncStorage.setItem('ROTATIONVALUE', JSON.stringify(this.state.selectedRotationValue));
			console.log('saved');

		} catch (e) {
			console.log('Catch in timer');
		}
	}

	handleTimer = (value) => {

		const intValue = Number(value);

		this.setState({
			timer: intValue
		})


	}

	handleAmbTimer = (value) => {

		const intValue = Number(value);

		this.setState({
			ambTimer: intValue
		})


	}

	selectRotation = (id, name) => {

		/* 0: DEfault,1:Anticlock, 2: LRUD */
		this.setState({
			rotationArray: this.state.rotationArray.map(data => {
				data.isSelected = id == data.id ? true : false;
				return data
			}),
			selectedRotationValue: id
		})
	}



	render() {

		return (
			<View style={styles.mainContainer}>
				<View>
					<Text style={styles.title}> Please adjust your signal Time(in Seconds)</Text>
					<TextInput numberOfLines={1} maxLength={3} style={styles.inputStye}
						keyboardType={'number-pad'}
						value={this.state.timer.toString()}
						onChangeText={(value) => {
							this.handleTimer(value)
						}}></TextInput>
				</View>

				<View style={styles.marginTop}>
					<Text style={styles.title}> Please adjust your Ambulance Time(in Seconds)</Text>
					<TextInput numberOfLines={1} maxLength={3} style={styles.inputStye}
						keyboardType={'number-pad'}
						value={this.state.ambTimer.toString()}
						onChangeText={(value) => {
							this.handleAmbTimer(value)
						}}></TextInput>
				</View>

				<View style={styles.marginTop}>
					<Text style={styles.title}> Please adjust your Signal Rotation</Text>
					{this.state.rotationArray.map((item, index) => (
						<TouchableOpacity style={[styles.rotationButton, { backgroundColor: item.isSelected ? 'red' : 'white' }]}
							onPress={() => this.selectRotation(item.id, item.name)}>
							<Text style>{item.name}</Text>
						</TouchableOpacity>
					))}
				</View>

				<TouchableOpacity
					style={[styles.rotationButton, { width: 300, marginTop: 10 }]}
					onPress={() => this.storeData()}>
					<Text style={styles.title}>Save</Text>
				</TouchableOpacity>

			</View>
		)
	}

}

const styles = StyleSheet.create({



	mainContainer: {
		paddingHorizontal: 20
	},

	inputStye: {
		borderWidth: 1,
		width: 50,
		height: 40,
		borderColor: 'black',
		borderRadius: 5,
		marginTop: 10

	},
	rotationButton: {
		height: 40,
		width: 200,
		backgroundColor: 'white',
		marginBottom: 10,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 10
	},
	marginTop: {
		marginTop: 10
	},
	title: {
		fontSize: 14,
		fontWeight: 'bold'
	}

});

