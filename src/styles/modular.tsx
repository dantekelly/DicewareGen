import {StyleSheet} from 'react-native';
import {color, fontSize, fontFamily} from './theme';

const modularStyles = StyleSheet.create({
  // Default
  h1: {
    fontFamily: fontFamily.regular,
    color: color.mainTextColor,
    fontSize: fontSize.large,
    letterSpacing: 1.25,
  },
  h2: {
    fontFamily: fontFamily.medium,
    color: color.mainTextColor,
    fontSize: fontSize.medium,
    letterSpacing: 0.25,
  },
  h3: {
    fontFamily: fontFamily.medium,
    color: color.mainTextColor,
    fontSize: fontSize.small,
    letterSpacing: 1.25,
    textTransform: 'uppercase',
  },
  p1: {
    fontFamily: fontFamily.regular,
    color: color.mainTextColor,
    fontSize: fontSize.regular,
    letterSpacing: 0.5,
  },
  p2: {
    fontFamily: fontFamily.regular,
    color: color.subTextColor,
    fontSize: fontSize.small,
    letterSpacing: 0.25,
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
