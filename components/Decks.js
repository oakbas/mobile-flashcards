import React, { Component } from 'react'
import { View, Text} from 'react-native'
import {receiveDecks} from '../actions/index'

export default class Dekcs extends Component {

  state = {
    ready: false
  };

  componentDidMount() {
    const {dispatch} = this.props
  }

  render() {
    return (
      <View>
          <Text>List Descks Basic</Text>
      </View>
    )

  }
}