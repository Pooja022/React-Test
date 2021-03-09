/**
 * The default React Native button component renders buttons
 * without a solid background on iOS. This is a similar implementation
 * but we can pass the `solid` prop if we want it to have a background.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View, ViewPropTypes } from 'react-native';

const Button = (props) => {
  const {
    accessibilityLabel,
    color,
    onPress,
    title,
    disabled,
    solid,
    labelColor,
    style,
  } = props;

  const buttonStyles = [styles.button];
  const textStyles = [styles.text];
  const accessibilityTraits = ['button'];
  const customStyles = style || {};

  if (disabled) {
    buttonStyles.push(styles.buttonDisabled);
    textStyles.push(styles.textDisabled);
    accessibilityTraits.push('disabled');
  }

  if (solid) {
    buttonStyles.push({ backgroundColor: color });
    textStyles.push({ color: labelColor || '#ffffff' });
  }

  return (
    <TouchableOpacity
      accessibilityComponentType="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityTraits={accessibilityTraits}
      onPress={onPress}
    >
      <View style={[buttonStyles, ...customStyles]}>
        <Text style={textStyles} disabled={disabled}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  accessibilityLabel: PropTypes.string,
  color: PropTypes.string,
  onPress: PropTypes.func,
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  solid: PropTypes.bool,
  labelColor: PropTypes.string,
  style: ViewPropTypes.style,
};

Button.defaultProps = {
  accessibilityLabel: null,
  color: '#ccc',
  onPress: () => true,
  disabled: false,
  solid: false,
  labelColor: '#106BFB',
  style: {},
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

export default Button;
