import React, { Component } from 'react';
import { TouchableOpacity, View, Text, TextInput } from 'react-native';

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {

			array: [{
				backgroundColor: 'red',
				textInput: '',
				colors: [{ id: '100', value: 'red' }, { id: '101', value: 'blue' }, { id: '102', value: 'green' }, { id: '103', value: 'yellow' }]

			},
			{

				backgroundColor: 'blue',
				textInput: '',
				colors: [{ id: '100', value: 'red' }, { id: '101', value: 'blue' }, { id: '102', value: 'green' }, { id: '103', value: 'yellow' }]
			},
			{
				backgroundColor: 'green',
				textInput: '',
				colors: [{ id: '100', value: 'red' }, { id: '101', value: 'blue' }, { id: '102', value: 'green' }, { id: '103', value: 'yellow' }]
			},
			{
				backgroundColor: 'yellow',
				textInput: '',
				colors: [{ id: '100', value: 'red' }, { id: '101', value: 'blue' }, { id: '102', value: 'green' }, { id: '103', value: 'yellow' }]
			}],
		}
	}

	updateBackgroundColor = (backgroundColor, itemClickIndex) => {
		for (let index = 0; index < this.state.array.length; index++) {
			const element = this.state.array[itemClickIndex];

			for (let j = 0; j < element.colors.length; j++) {
				const colorElement = element.colors[j];


				if (colorElement.id == backgroundColor) {
					this.state.array[itemClickIndex].backgroundColor = colorElement.value;

					this.setState({
						array: this.state.array,
					});
				}
			}

		}
	}



	render() {
		return (
			<View style={{ flexDirection: 'column', justifyContent: 'center', marginTop: 20 }}>

				{this.state.array.map((item, outerIndex) =>
					<View style={{ flexDirection: 'row' }}>
						<View style={{ backgroundColor: item.backgroundColor, height: 20, width: 40, borderRadius: 5 }} />

						{item.colors.map((item, index) =>
							<View style={{ flexDirection: 'column', alignItems: 'center' }}>

								<TouchableOpacity style={{ backgroundColor: item.value, height: 20, width: 40, marginHorizontal: 10, padding: 0, borderRadius: 5 }}
									onPress={() => this.updateBackgroundColor(item.id, outerIndex)}
								/>

								<Text>{item.id}</Text>
							</View>)}
						<TextInput
							style={{ height: 30, width: 50, borderWidth: 1, borderRadius: 5, fontSize: 11, padding: 0, textAlign: 'center' }}
							value={this.state.textInput}
							keyboardType={'number-pad'}
							onChangeText={(value) => this.updateBackgroundColor(value, outerIndex)}
						/>
					</View>)}

			</View>
		)


	}
}
