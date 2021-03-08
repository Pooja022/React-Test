import React, { Component } from 'react';
import NavigationUtils from './App/Utils/NavigationUtils';
import { Provider } from 'react-redux';
import configureStore from './App/Store/configureStore';

const store = configureStore()

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<NavigationUtils />
			</Provider>)

	}
}