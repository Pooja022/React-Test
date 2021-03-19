import React, { Component } from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'

const Loader = (props) => {

	const {
		animating
	} = props;
	return (
	<View style={styles.centerIndicator}>

		<ActivityIndicator
			animating={animating}
			size="large"
			color="#3c5468"
			style={{ zIndex: 100 }}
		/>

	</View>)


};

const styles = StyleSheet.create({
	spinnerTextStyle: {
		color: '#fff',
		marginBottom: 55,
		fontSize: 15,
		textAlign: 'center'
	},
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	},
	centerIndicator: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		zIndex: 9999,
	}
});


export default Loader;