import React, { Component } from "react";
import { View, FlatList, Text, Image, ActivityIndicator, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../redux/Auth/AuthAction';
import { DashboardStyle } from "../Styles/DashboardStyle";
import { printLog } from "../Utils/Validators";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constant from "../Utils/Constant";

const { width, height } = Dimensions.get('screen')

class Dashboard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			users: [],
			userIndex: 1,
			token: '',
			userObj: {},
			isLoading: false,
			totalPage: 1
		}
	}

	async componentDidMount() {

		this.getDataFromAsyncStorage();
		this.getUser();
	}

	getDataFromAsyncStorage = async () => {
		try {
			let userObj = JSON.parse(await AsyncStorage.getItem(Constant.USER));
			let token = JSON.parse(await AsyncStorage.getItem(Constant.TOKEN));

			printLog(userObj, token)
		} catch (error) {
			printLog('catch=======>', error);

		}
	}

	getUser = () => {
		this.setState({
			isLoading: true
		});

		if (this.state.totalPage)

			fetch('http://68.183.48.101:3333/users/list?page=' + this.state.userIndex, {
				method: "GET",
				headers: { "Content-type": "application/json", "Authorization": "Bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEyODEsImlhdCI6MTYxNTI4MDc5NH0.HeudVJ82Av1LuBpyDK5QXK6Yy3mpm9XV22V_7Hl5-RU' }
			})
				.then(response => response.json())
				.then(json => {
					printLog("Response User List===>", json)
					if (json.meta.status === 'fail') {
						alert(json.meta.message);
						this.setState({
							isLoading: false,
						})

					} else if (json.meta.status == 'ok' && json.data.users.length > 0) {
						this.setState({
							isLoading: false,
							users: this.state.userIndex === 1 ?
								json.data.users :
								[...this.state.users, ...json.data.users],
							totalPage: json.data.pagination.page
						});
					} else {
						alert('There is no more data to show')
						this.setState({
							isLoading: false,
						})
					}
				})
				.catch(err => {
					this.setState({
						isLoading: false,
					})
					console.log('Request Failed', err)
				});
	}

	loadMoreUsers = () => {
		printLog("LoadMore Subscategory", this.state.userIndex)
		this.setState({
			userIndex: this.state.userIndex + 1
		}, () => this.getUser())

	}

	render() {
		const { users, isLoading } = this.state

		return (
			<View style={{ flex: 1 }}>
				<View style={{ position: 'absolute', left: width * 0.5, top: height * 0.4, zIndex: 1 }}>
					<ActivityIndicator size="large" color="#0000ff" animating={isLoading} />
				</View>
				<FlatList
					data={users}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => renderUser(item)}
					onEndReachedThreshold={0.1}
					onEndReached={this.loadMoreUsers} />


			</View>
		)
	}
}

const renderUser = (item) => {
	return (
		<View style={DashboardStyle.cardContainer}>
			<Image
				source={
					{ uri: item.profile_pic }
				} style={DashboardStyle.image}
			/>
			<View style={{ flexDirection: 'column', marginStart: 20 }}>
				<Text style={DashboardStyle.productTitle}>{item.username}</Text>
				<Text style={DashboardStyle.productTitle}>{item.email}</Text>
			</View>
		</View>
	)
}

/* 
const mapStateToProps = state => ({
	isLoading: state.auth.isLoading,
});

const mapDispatchToProps = dispatch => ({
	getUser: data =>
		dispatch(actions.getUser(data)),

});
 */
export default connect(
	null,
	null,
)(Dashboard);
