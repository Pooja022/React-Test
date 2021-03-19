import Snackbar from 'react-native-snackbar';
import Colors from './Colors';
import PropTypes from 'prop-types';

export const showSnackbar = (props) => {
	const {
		text,
		duration,
		textColor,
		backgroundColor,
	} = props


	Snackbar.show({
		text: text,
		duration: Snackbar.LENGTH_SHORT,
	});
}

Snackbar.defaultProps = {
	text: 'sdas',
	duration: 500,
	textColor: Colors.white,
	backgroundColor: Colors.white,
}

Snackbar.propTypes = {
	text: PropTypes.string,
	duration: PropTypes.int,
	textColor: PropTypes.string,
	backgroundColor: PropTypes.string,
}


