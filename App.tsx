/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Clipboard,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import SplashScreen from 'react-native-splash-screen';
import Slider from '@react-native-community/slider';

import dicewareList from './src/diceware-min';
import modularStyles from './src/styles/modular';
import * as theme from './src/styles/theme';

const {color, fontSize, fontFamily} = theme;

class App extends React.Component<{}, {wordCount: number}> {
  constructor(props) {
    super(props);

    this.state = {
      wordCount: 1,
      data: [],
    };

    this.changeCount = this.changeCount.bind(this);
    this.randomize = this.randomize.bind(this);
  }
  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen

    setTimeout(function() {
      SplashScreen.hide();
    }, 5000);
  }

  changeCount(val: number) {
    this.setState({wordCount: val}, this.randomize);
  }

  copyToClipboard() {
    const {data} = this.state;
    Clipboard.setString(
      `${data[0][1]} ${data[1][1]} ${data[2][1]} ${data[3][1]} ${data[4][1]} `,
    );
  }

  randomize() {
    const {wordCount} = this.state;
    let data = [...Array(wordCount).keys()];
    let final = [];

    const numbers = data.map(() => {
      const array = new Uint32Array(5);
      let number = '';

      crypto.getRandomValues(array);

      array.forEach(x => {
        number += String(Math.round((x / 4294967295) * 5 + 1));
      });

      return number;
    });

    numbers.forEach(number => {
      const string = dicewareList[number];

      console.log(number);

      final.push({number, string});
    });

    this.setState({data: final}, () => {
      console.log('Data is now', data);
      console.log('Data 0 is', data[0][0]);
    });
  }

  render() {
    const {data, wordCount} = this.state;

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <View style={styles.mainContent}>
            <Text style={[styles.h2, styles.center]}>
              {wordCount === 1 ? '1 word' : `${wordCount} words`}
            </Text>
            <Slider
              style={[
                styles.center,
                {width: '100%', height: 40, marginBottom: 10},
              ]}
              minimumValue={1}
              maximumValue={10}
              step={1}
              thumbTintColor={color.accentColor}
              minimumTrackTintColor={color.accentColor}
              maximumTrackTintColor={color.accentColor}
              onValueChange={val => {
                this.changeCount(val);
              }}
              value={wordCount}
            />
            <View
              style={[
                {
                  marginBottom: 30,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                },
              ]}>
              <TouchableOpacity onPress={this.randomize} style={styles.button}>
                <Text style={styles.h3}>Randomize</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.copyToClipboard}
                style={styles.button}>
                <Text style={styles.h3}>Copy</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.listContainer}>
              {data.map(({number, string}) => {
                <View
                  style={[styles.center, styles.inline, {marginBottom: 20}]}>
                  <Text style={[styles.p1, {marginRight: 10}]}>Hello</Text>
                  <Text style={styles.p2}>{number}</Text>
                </View>;
              })}
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const localStyles = StyleSheet.create({
  listContainer: {},
  button: {
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 4,
    width: 'auto',
    elevation: 2,
    backgroundColor: color.accentColor,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

const styles = {...modularStyles, ...localStyles};

export default App;
