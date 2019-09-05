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

import {Colors} from 'react-native/Libraries/NewAppScreen';

import SplashScreen from 'react-native-splash-screen';
import Slider from '@react-native-community/slider';
import 'react-native-get-random-values';

import dicewareList from './src/diceware-min';
import modularStyles from './src/styles/modular';
import * as theme from './src/styles/theme';

const {color, fontSize, fontFamily} = theme;

interface State {
  wordCount: number;
  data: [{string: string; number: number}];
}

class App extends React.Component<{}, State> {
  constructor(props) {
    super(props);

    this.state = {
      wordCount: 5,
      data: [],
    };

    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.changeCount = this.changeCount.bind(this);
    this.randomize = this.randomize.bind(this);
  }
  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen

    this.randomize();

    setTimeout(function() {
      SplashScreen.hide();
    }, 1000);
  }

  changeCount(val: number) {
    this.setState({wordCount: val}, this.randomize);
  }

  copyToClipboard() {
    const {data} = this.state;
    let clipData = '';

    console.log('Data is', data);
    for (const [number, string] of data) {
      clipData += `${string} `;
    }
    Clipboard.setString(clipData.trim());
  }

  randomize() {
    const {wordCount} = this.state;
    let data = [...Array(wordCount).keys()];

    const numbers = data.map(() => {
      const array = new Uint32Array(5);
      let number = '';

      crypto.getRandomValues(array);

      array.forEach(x => {
        number += String(Math.round((x / 4294967295) * 5 + 1));
      });

      return parseInt(number);
    });

    const final = numbers.map(number => {
      const string = dicewareList[number];

      return [number, string];
    });

    this.setState({data: final}, () => {
      console.log('Data is now', final);
      console.log('Data 0 is', final[0]);
    });
  }

  render() {
    const {data, wordCount} = this.state;

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <View style={styles.mainContent}>
            <Text style={[styles.h2, styles.center]} selectable>
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
                <Text style={styles.h3} selectable>
                  Randomize
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.copyToClipboard}
                style={styles.button}>
                <Text style={styles.h3}>Copy</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.listContainer} selectable>
              {data.map(([number, string]) => (
                <View
                  key={number}
                  style={[styles.center, styles.inline, {marginBottom: 20}]}>
                  <Text style={[styles.p1, {marginRight: 10}]} selectable>
                    {string}
                  </Text>
                  <Text style={styles.p2} selectable>
                    {number}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const localStyles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 4,
    width: 'auto',
    elevation: 2,
    backgroundColor: color.accentColor,
  },
});

const styles = {...modularStyles, ...localStyles};

export default App;
