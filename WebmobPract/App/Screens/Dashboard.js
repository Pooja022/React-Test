import React, { Component } from "react";
import { View, FlatList, Text, Image, ActivityIndicator, Dimensions } from 'react-native';
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
			totalPage: 1,
			isLoadingMore: false,
		}
	}

	async componentDidMount() {

		this.getDataFromAsyncStorage();
		this.setState({
			isLoading: true
		})

	}

	getDataFromAsyncStorage = async () => {
		try {
			let userObj = JSON.parse(await AsyncStorage.getItem(Constant.USER));
			let token = JSON.parse(await AsyncStorage.getItem(Constant.TOKEN));
			this.setState({
				token
			}, () => {
				this.getUser();
			})
			printLog(userObj, token)
		} catch (error) {
			printLog('catch=======>', error);
			alert('Please try again later')

		}
	}

	getUser = () => {
		alert(this.state.token)

		if (this.state.totalPage)

			fetch('http://68.183.48.101:3333/users/list?page=' + this.state.userIndex, {
				method: "GET",
				headers: { "Content-type": "application/json", "Authorization": `Bearer ${this.state.token}` }
			})
				.then(response => response.json())
				.then(json => {
					printLog("Response User List===>", json)
					if (json.meta.status === 'fail') {
						alert(json.meta.message);
						this.setState({
							isLoading: false,
						})
						this.props.navigation.replace('Login');

					} else if (json.meta.status == 'ok' && json.data.users.length > 0) {
						this.setState({
							isLoading: false,
							isLoadingMore: false,
							users: this.state.userIndex === 1 ?
								json.data.users :
								[...this.state.users, ...json.data.users],
							totalPage: json.data.pagination.page
						});
					} else {
						alert('There is no more data to show')
						this.setState({
							isLoading: false,
							isLoadingMore: false,
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
			userIndex: this.state.userIndex + 1,
			isLoadingMore: true
		}, () => this.getUser())
	}

	render() {
		const { users, isLoading, isLoadingMore } = this.state

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
				<ActivityIndicator size="large" color="#0000ff" animating={isLoadingMore} />
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
				<Text style={DashboardStyle.title}>{item.username}</Text>
				<Text style={DashboardStyle.subtitle}>{item.email}</Text>
			</View>
		</View>
	)
}


export default Dashboard;
