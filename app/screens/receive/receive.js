import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Clipboard, TouchableHighlight, Alert, AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from './../../config/colors'
import Header from './../../components/header'

export default class Receive extends Component {
  static navigationOptions = {
    title: 'Receive',
  }

  constructor() {
    super()

    this.state = {
      imageURI: 'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=undefined&choe=UTF-8',
      email: '',
    }
  }

  async componentWillMount() {
    const value = await AsyncStorage.getItem('user');
    const user = JSON.parse(value)
    const imageURI = 'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=' + user.email + '&choe=UTF-8'
    this.setState({ imageURI, email: user.email })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          drawer
          title="Receive"
        />
        <Text style={styles.text}>
          The QR code is your public address for accepting payments.
        </Text>
        <Image
          style={{ width: 300, height: 300 }}
          source={{ uri: this.state.imageURI }}
        />
        <View style={styles.boxed}>
          <View style={styles.memoIcon}>
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.memoText}>
                {this.state.email}
              </Text>
            </View>
            <TouchableHighlight
              underlayColor={'white'}
              onPress={() => {
                Clipboard.setString(this.state.email)
                Alert.alert(
                  null,
                  'Copied',
                )
              }}>
              <Icon
                name="ios-copy-outline"
                size={30}
                color={Colors.black}
              />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.black,
    padding: 20,
  },
  boxed: {
    flexDirection: 'column',
    padding: 5,
    backgroundColor: Colors.lightgray,
  },
  memoText: {
    flex: 1,
    padding: 2,
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.black,
  },
  memoIcon: {
    padding: 5,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
