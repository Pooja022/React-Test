import {StyleSheet} from 'react-native';
import Colors from '../Utils/Colors';


export const DashboardStyle = StyleSheet.create({
 
  cardContainer: {
	marginBottom:10,
	paddingHorizontal:10,
	paddingVertical:10,
	justifyContent:'center',
	paddingStart:10,
	height:50,
	backgroundColor:Colors.black
},
title:{
	color:Colors.white,
	fontSize:14

},
subcategoryTitle:{
	color:Colors.black,
	fontSize:14,
	paddingStart:5,
	fontWeight:'bold'
},
productTitle:{
	color:Colors.black,
	fontSize:12,

},
image:{
	height:100,
	width:100,
	borderRadius:10
},
productContainer:{
	marginBottom:10,
	paddingHorizontal:10,
	paddingVertical:10,
	alignItems:'center',
	paddingStart:10,
}
  
});
