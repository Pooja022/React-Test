import {StyleSheet} from 'react-native';
import Colors from '../Utils/Colors';


export const DashboardStyle = StyleSheet.create({
 
  cardContainer: {
	paddingHorizontal:10,
	paddingVertical:6,
	alignItems:'center',
	paddingStart:10,
	flexDirection:'row',
	backgroundColor:'white',
	borderRadius:10,
	marginHorizontal:10,
	marginTop:10
},

title:{
	color:Colors.black,
	fontSize:14,
},

image:{
	height:100,
	width:100,
	borderRadius:10
},

title:{
	color:Colors.black,
	fontSize:18,
},

subtitle:{
	color:Colors.grey,
	fontSize:18,
}

});
