import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

  const Input  = (props)=>{
    
    const {

    }=props


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
                />
            </View>
        );
    
}


const styles = StyleSheet.create({
    mainView: {
        // borderColor: 'gray',
        // borderWidth: 0.5,
        borderRadius: 10,
        height: 45,
        width:'100%',
        backgroundColor:'#E5E7E4',
        marginVertical: 10,
        // paddingHorizontal: 10,
        // marginHorizontal: 30,
    },

    textInput: {
        height: 45,
    },
    iconStyle: {
        fontSize: 20,
        paddingStart: 10,
      },
});

export default Input;