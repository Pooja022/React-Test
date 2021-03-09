import {StyleSheet} from 'react-native';
import Colors from '../Utils/Colors';


export const DashboardStyle = StyleSheet.create({
 
  cardContainer: {
	marginBottom:10,
	paddingHorizontal:10,
	paddingVertical:10,
	alignItems:'center',
	paddingStart:10,
	flexDirection:'row'
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

});
