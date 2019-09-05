import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');
const realWidth = height > width ? width : height;

const normalize = (fontSize: number) =>
  Math.round((fontSize * realWidth) / 375);

const color = {
  accentColor: '#3c91e6',
  backgroundColor: '#292f36',
  mainTextColor: '#ffffff',
  subTextColor: '#464959',
};

const fontSize = {
  large: normalize(34),
  medium: normalize(20),
  regular: normalize(16),
  small: normalize(14),
};

const fontFamily = {
  medium: 'Roboto-Medium',
  regular: 'Roboto-Regular',
};

const padding = 40;
const navbarHeight = Platform.OS === 'ios' ? 64 : 54;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export {
  color,
  fontSize,
  fontFamily,
  padding,
  navbarHeight,
  windowWidth,
  windowHeight,
  normalize,
};
