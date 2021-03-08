import React, { Component } from "react";
import { View, FlatList, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../redux/Auth/AuthAction';
import { DashboardStyle } from "../Styles/DashboardStyle";
import { printLog } from "../Utils/Validators";
import  {Button,Loader,TouchableText}  from "../CommonComponents";


class Dashboard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			category: [],
			subcategory: [],
			products: [],
			subcategoryPageIndex: 1,
			productPageIndex: 1,
		}
	}

	componentDidMount() {
		this.getCategoryAPI();

		this.getSubcategoryAPI();

	}

	getSubcategoryAPI = () => {

		const requestData = {
			"CategoryId": 56,
			"PageIndex": this.state.subcategoryPageIndex
		}

		this.props.getSubcategory(requestData).then(res => {
			if (res.action.payload.Category[0].SubCategories) {
				this.setState({
					subcategory: this.state.subcategoryPageIndex === 1 ? res.action.payload.Category[0].SubCategories : [...this.state.subcategory, ...res.action.payload.Category[0].SubCategories]
				},()=>{
					if(this.state.subcategoryPageIndex === 1){
						this.getProductsAPI(this.state.subcategory[0].Id);
					}
				});
			}

		});
	}

	getCategoryAPI = () => {
		const requestData = {
			"CategoryId": 0,
			"DeviceManufacturer": "Google",
			"DeviceModel": "android",
			"DeviceToken": " ",
			"PageIndex": 1
		}

		this.props.getCategory(requestData).then(res => {
			printLog("getCategory=======>", res)
			this.setState({
				category: res.action.payload.Category
			})
		});

	}

	loadMoreSubcategory = () => {
		printLog("LoadMore Subscategory", this.state.subcategoryPageIndex)
		this.setState({
			subcategoryPageIndex: this.state.subcategoryPageIndex + 1
		}, () => this.getSubcategoryAPI())

	}

	loadMoreProduct = () => {
		printLog("loadMoreProduct", this.state.productPageIndex)
		this.setState({
			productPageIndex: this.state.productPageIndex + 1
		}, () => this.getProductsAPI())

	}

	getProductsAPI = (subcategoryId) => {

		const requestData = {
			"PageIndex": this.state.productPageIndex,
			"SubCategoryId": subcategoryId
		}

		this.props.getSubProducts(requestData).then(res => {
			printLog("getProductsAPI=======>", res)
			this.setState({
				products: res.action.payload
			})
		});

	}


	render() {
		const { category, subcategory, products } = this.state
		return (
			<View style={{ flex: 1 }}>
					<Loader/>
				<FlatList
					horizontal
					style={{ maxHeight: 50 }}
					data={category}
					keyExtractor={(item) => item.Id.toString()}
					renderItem={({ item }) => renderCategory(item)} />

				<FlatList
					data={subcategory}
					keyExtractor={(item) => item.Id.toString()}
					renderItem={({ item }) => renderSubcategory(item, products)}
					onEndReachedThreshold={0.1}
					onEndReached={this.loadMoreSubcategory} />
			</View>
		)
	}
}

const renderCategory = (item) => {
	return (
		<View style={DashboardStyle.cardContainer}>
			<Text style={DashboardStyle.title}>{item.Name}</Text>
		</View>
	)
}
const renderSubcategory = (item, products,getProductsAPI) => {
	printLog(JSON.stringify(item))
	return (
		<View>
			<Text style={DashboardStyle.subcategoryTitle}>{item.Name.toUpperCase()}</Text>
			<FlatList
				horizontal
				data={item.Product}
				keyExtractor={(item) => item.Id.toString()}
				renderItem={({ item }) => renderProduct(item)}

			/>
		</View>
	)
}

const renderProduct = (item) => {
	return (
		<View style={DashboardStyle.productContainer}>
			<Image
				source={
					{ uri: item.ImageName }
				} style={DashboardStyle.image}
			/>
			<Text style={DashboardStyle.productTitle}>{item.Name}</Text>
		</View>
	)
}

const mapStateToProps = state => ({
	isLoading: state.auth.isLoading,
});

const mapDispatchToProps = dispatch => ({
	getCategory: data =>
		dispatch(actions.getCategory(data)),
	getSubcategory: data =>
		dispatch(actions.getSubcategory(data)),
	getSubProducts: data =>
		dispatch(actions.getSubProducts(data)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Dashboard);
