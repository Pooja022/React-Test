import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Input = (props) => {

	const {
		placeholder,
		onChangeText,
		secureTextEntry,
		keyboardType,
		maxLength,
		numberOfLines,
		value
	} = props


	return (
		<View
			style={[styles.mainView]}>
			<TextInput
				style={[styles.textInput]}
				placeholder={placeholder}
				onChangeText={onChangeText}
				secureTextEntry={secureTextEntry}
				placeholderTextColor='gray'
				keyboardType={keyboardType}
				maxLength={maxLength}
				numberOfLines={numberOfLines}
				value={value}
			/>
		</View>
	);

}


Input.defaultProps = {

	placeholder: '',
	onChangeText: () => true,
	secureTextEntry: false,
	keyboardType: 'default',
	maxLength: 20,
	numberOfLines:1

};


const styles = StyleSheet.create({
	mainView: {
	
		borderRadius: 8,
		height: 45,
		width: '100%',
		backgroundColor: '#E5E7E4',
		marginVertical: 5,
		
	},

	textInput: {
		height: 45,
		width:'70%',
		backgroundColor:'white'
	},
	iconStyle: {
		fontSize: 20,
		paddingStart: 10,
	},
});

export default Input;