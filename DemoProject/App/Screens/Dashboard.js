import React, { Component } from "react";
import { View, FlatList, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../redux/Auth/AuthAction';
import { DashboardStyle } from "../Styles/DashboardStyle";
import { printLog } from "../Utils/Validators";
import { Button, Loader, TouchableText } from "../CommonComponents";


class Dashboard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			users: [],
			userIndex: 1,
		}
	}

	componentDidMount() {
		this.getUser();
	}

	getUser = () => {

		const requestData = {
			"PageIndex": this.state.userIndex
		}

		this.props.getUser(requestData).then(res => {
			if (res.action.payload.Category[0].SubCategories) {
				this.setState({
					users: this.state.subcategoryPageIndex === 1 ? res.action.payload.Category[0].SubCategories : [...this.state.subcategory, ...res.action.payload.Category[0].SubCategories]
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

	render() {
		const { users } = this.state

		return (
			<View style={{ flex: 1 }}>
				<Loader />
				<FlatList
					data={users}
					keyExtractor={(item) => item.Id.toString()}
					renderItem={({ item }) => renderUser(item)} />


			</View>
		)
	}
}

const renderUser = (item) => {
	return (
		<View style={DashboardStyle.cardContainer}>
			<Text style={DashboardStyle.title}>{item.Name}</Text>
		</View>
	)
}


const mapStateToProps = state => ({
	isLoading: state.auth.isLoading,
});

const mapDispatchToProps = dispatch => ({
	getUser: data =>
		dispatch(actions.getUser(data)),

});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Dashboard);
