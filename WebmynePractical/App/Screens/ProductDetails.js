import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	StatusBar
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { printLog } from '../Utils/Validators';



export default class ProductDetails extends Component {

	constructor(props) {
		super(props);

		this.state = {
			product: {}
		}
	}


	componentDidMount() {

		const { product } = this.props.route.params;
		printLog("Product==>",product)
		this.setState({
			product
		})

	}



	render() {
		const{product}=this.state;
		return (
			<View style={styles.container}>

				<Text>Product Details</Text>
				<View style={{marginTop:30}}>
				<Text>Name : {product.name }</Text>
				<Text>Price : {product.price }</Text>
				<Text>Quantity : {product.quantity }</Text>
				</View>
				

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-start',
		padding:20,
		backgroundColor: Colors.white,
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