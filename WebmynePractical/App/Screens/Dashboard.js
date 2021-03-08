import React, { Component } from "react";
import { View, FlatList, Text, Image, ActivityIndicator, Dimensions, Touchable, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../redux/Auth/AuthAction';
import { DashboardStyle } from "../Styles/DashboardStyle";
import { printLog } from "../Utils/Validators";
const { width, height } = Dimensions.get('screen')

class Dashboard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			category: [],
			catIndex: 1,
			storeDetails: {},
			isLoading: false,
		}
	}

	componentDidMount() {
		this.setState({
			isLoading: true,

		})
		this.getCategoryAPI();
	}

	getCategoryAPI = () => {

		const requestData = {
			"cat_pageNumber": this.state.catIndex,
			"cat_perpage": 5,
			"categoryID": "3559",
			"mallID": "2",
			"pageNumber": 1,
			"perpage": 5,
			"sort": "",
			"sort_type": "",
			"storeID": "18"
		}

		this.props.getCategory(requestData).then(res => {

			if (res.action.payload.Store_category_with_product.length > 0) {
				this.setState({
					category: this.state.catIndex === 1 ? res.action.payload.Store_category_with_product : [...this.state.category, ...res.action.payload.Store_category_with_product],
					storeDetails: res.action.payload.Store_detail,
					isLoading: false
				})
			} else {
				alert('There is no more data to show');
				this.setState({

					isLoading: false
				})
			}


		});
	}

	loadMoreCategory = () => {
		printLog("LoadMore loadMoreCategory", this.state.catIndex)
		this.setState({
			catIndex: this.state.catIndex + 1,
			isLoading: true,

		}, () => this.getCategoryAPI())

	}

	goToProductDetails = (product)=>{
		printLog('Dashboard Product====>',product)
		this.props.navigation.navigate('ProductDetails', { 'product':product});
	}

	render() {
		const { category, storeDetails, isLoading } = this.state
		return (
			<View style={DashboardStyle.mainContainer}>
				<View style={{position: 'absolute', left: width * 0.5, top: height * 0.4 }}>
					<ActivityIndicator size="large" color="#0000ff" animating={isLoading} hidesWhenStopped />
				</View>

				<View style={DashboardStyle.productContainer}>
					<Image
						source={
							{ uri: storeDetails.ImageURL }
						} style={DashboardStyle.image}
					/>
					<View>
						<Text style={DashboardStyle.productTitle}>{storeDetails.name}</Text>
						<Text style={DashboardStyle.productTitle}>{storeDetails.Location}</Text>
					</View>
				</View>

				<View>
					<TextInput
						placeholder={'Seacrch'}
						style={{ borderWidth: 1, borderRadius: 10, padding: 10 }} />
				</View>

				<FlatList
					data={category}
					keyExtractor={(item) => item.categoryID.toString()}
					renderItem={({ item }) => renderCategory(item,this.goToProductDetails)}
					onEndReachedThreshold={0.1}
					onEndReached={this.loadMoreCategory} />

			</View>
		)
	}
}

const renderCategory = (item,goToProductDetails) => {
	return (
		<View style={DashboardStyle.cardContainer}>
			<Text style={DashboardStyle.title}>{item.name}</Text>

			<FlatList
				horizontal
				data={item.product}
				keyExtractor={(item) => item.ID.toString()}
				renderItem={({ item }) => renderProduct(item,goToProductDetails)}
			/>
		</View>
	)
}


const renderProduct = (item,goToProductDetails) => {

	return (
		<TouchableOpacity style={DashboardStyle.productContainerFlatlist}
		onPress={()=>{goToProductDetails(item)}}>
			<Image
				source={
					{ uri: item.ImageURL }
				} style={DashboardStyle.image}
			/>
			<Text style={DashboardStyle.productTitle}>{item.name}</Text>
		</TouchableOpacity>
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
