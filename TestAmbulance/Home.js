
import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	DeviceEventEmitter
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


var vid = 0;
var vTimer = '';
var vAmbTimer = '';
var vRotation = 0;

export default class Home extends Component {

	constructor(props) {
		super(props)
		this.state = {
			isSignalaActive: false,
			isSignalbActive: false,
			isSignalcActive: false,
			isSignaldActive: false,
			timer: 5,
			id: 0,
			ambTimer: 10,
			rotationType: 0
		}
	}

	componentDidMount() {

		DeviceEventEmitter.addListener('updateDataFromAsync', this.updateDataFromAsync.bind(this));
		this.updateDataFromAsync()


	}

	componentWillUnmount() {
		DeviceEventEmitter.removeListener('updateDataFromAsync');
	}

	updateDataFromAsync = () => {
		this.getDataFromAsyncStorage().then(() => {
			setInterval(() => {
				this.onAmbulanceClicked(vid);
			}, this.state.timer * 1000);
		});
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
					rotationType: vRotation
				}, () => { console.log('rotation', this.state.rotationType); })
			}
			console.log('getDataFromAsyncStorage', vRotation, vAmbTimer, vTimer);


		} catch (e) {
			console.log('getDataFromAsyncStorage', e);
		}
	}

	handleStateChange = (aSignal, bSignal, cSignal, dSignal, id) => {
		//console.log(aSignal, bSignal, cSignal, dSignal);
		this.setState({
			isSignalaActive: aSignal,
			isSignalbActive: bSignal,
			isSignalcActive: cSignal,
			isSignaldActive: dSignal,
		}, () => {
			if (this.state.rotationType == 0) {
				for (let index = 0; index < 4; index++) {
					if (id == 3) {
						vid = 0;
					}
					else {
						vid = id + 1
					}
				}
			}
			if (this.state.rotationType == 1) {
				for (let index = 4; index > 0; index--) {
					if (id == 0) {
						vid = 3;
					}
					else {
						vid = id - 1
					}
				}
			}

		})

	}

	onAmbulanceClicked = (clickedItem) => {

		switch (clickedItem) {
			case 0:
				this.handleStateChange(true, false, false, false, 0)
				break;

			case 1:
				this.handleStateChange(false, true, false, false, 1)
				break;

			case 2:
				this.handleStateChange(false, false, true, false, 2)
				break;

			case 3:
				this.handleStateChange(false, false, false, true, 3)
				break;
			default:
				break;
		}
	}

	goToSettingPage = () => {

	}

	render() {

		const { isSignalaActive, isSignalbActive, isSignalcActive, isSignaldActive, timer, rotationType } = this.state;
		return (

			<View style={styles.mainContainer}>

				<TouchableOpacity
					onPress={() => this.props.navigation.navigate('Setting')}
					style={{ alignItems: 'flex-end', marginBottom: 20 }}>
					<Text>Settings</Text>
				</TouchableOpacity>


				{/* A Signal */}

				<View style={styles.aContainer}>
					<TouchableOpacity
						onPress={() => this.onAmbulanceClicked(0)}
						style={[styles.ambButton, styles.marginBottom]}>
						<Text>AMB</Text>
					</TouchableOpacity>
					<View style={[styles.ambButton, { backgroundColor: isSignalaActive ? 'green' : 'white' }]}>
						<Text>A</Text>
					</View>
					<Text style={styles.signalTime}>{timer}</Text>
				</View>




				{/* B and D Signal */}

				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<View style={styles.bContainer}>
						<TouchableOpacity
							onPress={() => this.onAmbulanceClicked(3)}
							style={[styles.ambButton, styles.marginEnd]}>
							<Text>AMB</Text>
						</TouchableOpacity>
						<View style={[styles.ambButton, { marginEnd: 10, backgroundColor: isSignaldActive ? 'green' : 'white' }]}>
							<Text>D</Text>
						</View>
						<Text style={[styles.signalTime, styles.marginEnd]}>{timer}</Text>
					</View>

					<View style={styles.bContainer}>
						<Text style={[styles.signalTime, styles.marginEnd]}>{timer}</Text>
						<View style={[styles.ambButton, { marginEnd: 10, backgroundColor: isSignalbActive ? 'green' : 'white' }]}>
							<Text>B</Text>
						</View>
						<TouchableOpacity
							onPress={() => this.onAmbulanceClicked(1)}
							style={styles.ambButton}>
							<Text>AMB</Text>
						</TouchableOpacity>
					</View>

				</View>


				{/* C Signal */}
				<View style={styles.aContainer}>

					<Text style={styles.signalTime}>{timer}</Text>

					<View style={[styles.ambButton, styles.marginBottom, { backgroundColor: isSignalcActive ? 'green' : 'white' }]}>
						<Text>C</Text>
					</View>

					<TouchableOpacity
						onPress={() => this.onAmbulanceClicked(2)}
						style={styles.ambButton}>
						<Text>AMB</Text>
					</TouchableOpacity>

				</View>

			</View>

		)
	}

}

const styles = StyleSheet.create({

	mainContainer: {
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: 10
	},

	aContainer: {
		alignItems: 'center',
		justifyContent: 'center'
	},


	bContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row'
	},
	ambButton: {
		borderRadius: 5,
		height: 50,
		width: 50,
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},

	signalTime: {
		fontSize: 14,
		fontWeight: 'bold',

	},

	marginEnd: {
		marginEnd: 10
	},
	marginBottom: {
		marginBottom: 10
	}
});

