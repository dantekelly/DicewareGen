import {StyleSheet} from 'react-native';
import {color, fontSize, fontFamily} from './theme';

const modularStyles = StyleSheet.create({
  // Default
  h1: {
    fontFamily: fontFamily.regular,
    color: color.mainTextColor,
    fontSize: fontSize.large,
  },
  h2: {
    fontFamily: fontFamily.medium,
    color: color.mainTextColor,
    fontSize: fontSize.medium,
  },
  h3: {
    fontFamily: fontFamily.medium,
    color: color.mainTextColor,
    fontSize: fontSize.small,
  },
  p1: {
    fontFamily: fontFamily.regular,
    color: color.mainTextColor,
    fontSize: fontSize.regular,
  },
  p2: {
    fontFamily: fontFamily.regular,
    color: color.subTextColor,
    fontSize: fontSize.small,
  },

  // Modular
  center: {
    alignSelf: 'center',
    textAlign: 'center',
  },
  inline: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  // Main Containers
  container: {
    backgroundColor: color.backgroundColor,
    flex: 1,
    flexDirection: 'column',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 25,
  },
  paragraphContainer: {
    alignSelf: 'center',
    marginTop: 10,
  },

  seperator: {
    height: 10,
  },
});

export default modularStyles;
