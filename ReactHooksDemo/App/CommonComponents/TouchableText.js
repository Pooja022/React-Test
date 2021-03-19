/**
 * The default React Native button component renders buttons
 * without a solid background on iOS. This is a similar implementation
 * but we can pass the `solid` prop if we want it to have a background.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View, ViewPropTypes } from 'react-native';

const TouchableText = (props) => {
  const {
   disabled,
   title,
   textStyles
  } = props;

 
 
  return (
    <TouchableOpacity>
        <Text  disabled={disabled}>
          {title}
        </Text>
    </TouchableOpacity>
  );
};

TouchableText.propTypes = {
  accessibilityLabel: PropTypes.string,
  color: PropTypes.string,
  onPress: PropTypes.func,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  solid: PropTypes.bool,
  labelColor: PropTypes.string,
  style: ViewPropTypes.style,
  textStyles:ViewPropTypes.style
};

TouchableText.defaultProps = {
  accessibilityLabel: null,
  color: '#ccc',
  onPress: () => true,
  disabled: false,
  solid: false,
  labelColor: '#106BFB',
  style: {},
  title:'Hello',
  textStyles:{}
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 0,
    justifyContent:'center',
    marginVertical: 4,
    height: 50,
  },
  text: {
    fontSize: 17,
    textAlign: 'center',
    fontWeight: '400',
    color: '#106BFB', // blue (see 'Settings > Sign Out' button)
  },
  buttonDisabled: {},
  textDisabled: {
    color: '#cdcdcd', // ios default disabled color
  },
});

export default TouchableText;
