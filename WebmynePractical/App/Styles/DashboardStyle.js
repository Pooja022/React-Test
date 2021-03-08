import { StyleSheet,Dimensions } from 'react-native';
import Colors from '../Utils/Colors';
const { width, height } = Dimensions.get('screen')


export const DashboardStyle = StyleSheet.create({

	mainContainer:
		{ justifyContent: 'center', padding: 10 }

	,

	cardContainer: {
		marginBottom: 10,
		paddingHorizontal: 10,
		paddingVertical: 10,
		justifyContent: 'center',
		paddingStart: 10,
	},
	title: {
		color: Colors.black,
		fontSize: 16,

	},
	subcategoryTitle: {
		color: Colors.black,
		fontSize: 14,
		paddingStart: 5,
		fontWeight: 'bold'
	},
	productTitle: {
		color: Colors.black,
		fontSize: 12,

	},
	image: {
		height: 100,
		width: 100,
		borderRadius: 10
	},
	productContainer: {
		marginBottom: 10,
		paddingHorizontal: 10,
		paddingVertical: 10,
		alignItems: 'center',
		paddingStart: 10,
		flexDirection: 'row'
	},

	productContainerFlatlist: {
		padding: 10,
		alignItems: 'center',
		height: 150
	},
	loaderConatiner:
		{ position: 'absolute', left: width * 0.5, top: height * 0.4 }


});
