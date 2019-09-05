/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-get-random-values';
import * as React from 'react';
import {
  Clipboard,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import Slider from '@react-native-community/slider';
import SplashScreen from 'react-native-splash-screen';

import * as theme from './src/styles/theme';
import dicewareList from './src/diceware-min';
import modularStyles from './src/styles/modular';

const {color} = theme;

interface State {
  data: [number, string][];
  wordCount: number;
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      data: [],
      wordCount: 5,
    };

    this.changeCount = this.changeCount.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.randomize = this.randomize.bind(this);
  }
  componentDidMount() {
    const {wordCount} = this.state;

    this.randomize(wordCount);

    setTimeout(function() {
      SplashScreen.hide();
    }, 1000);
  }

  changeCount(val: number) {
    this.setState({wordCount: val}, () => this.randomize(val));
  }

  copyToClipboard() {
    const {data} = this.state;
    let clipData = '';

    for (const [number, string] of data) {
      clipData += `${string} `;
    }

    Clipboard.setString(clipData.trim());
  }

  randomize(wordCount: number) {
    let array = [...Array(wordCount)];
    const binaryCalc = 4294967295;
    const calculation = (x: number) => Math.round((x / binaryCalc) * 5 + 1);
    const max = 6;
    const min = 1;
    let val = '';

    /*
    const numbers = array.map(() => {
      const array = new Uint32Array(6);
      let number = '';

      crypto.getRandomValues(array);
      array.forEach(x => {
        number += String(calculation(x));
      });

      return parseInt(number);
    });
    */

    const getRandomInt = () => {
      // Create byte array and fill with 1 random number
      const range = max - min + 1;
      const max_range = 256;

      let byteArray = new Uint8Array(1);
      crypto.getRandomValues(byteArray);

      if (byteArray[0] >= Math.floor(max_range / range) * range)
        return getRandomInt();

      return min + (byteArray[0] % range);
    };

    const numbers = array.map(() => {
      const array = new Uint32Array(5);
      let number = '';

      crypto.getRandomValues(array);
      array.forEach(x => {
        number += String(getRandomInt());
      });

      return parseInt(number);
    });

    console.log('Numbers is ', numbers);

    const data = numbers.map(number => {
      const string = dicewareList[number];

      return [number, string];
    });

    this.setState({data}, () => {
      console.log('Data is now', data);
      console.log('Data 0 is', data[0]);
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
              style={[styles.center, styles.slider]}
              minimumValue={1}
              maximumValue={10}
              step={1}
              thumbTintColor={color.accentColor}
              minimumTrackTintColor={color.accentColor}
              maximumTrackTintColor={color.accentColor}
              onValueChange={(val: number) => {
                this.changeCount(val);
              }}
              value={wordCount}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPressIn={() => Vibration.vibrate(50)}
                onPress={() => this.randomize(wordCount)}
                style={styles.button}>
                <Text style={styles.h3}>Randomize</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPressIn={() => Vibration.vibrate(50)}
                onPress={this.copyToClipboard}
                style={styles.button}>
                <Text style={styles.h3}>Copy</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.listContainer}>
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
  buttonContainer: {
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 10,
  },
});

const styles = {...modularStyles, ...localStyles};

export default App;
