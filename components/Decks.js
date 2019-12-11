import React, { Component } from 'react'
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {receiveDecks} from '../actions/index'
import { fetchDecks } from '../utils/api'
import { connect } from 'react-redux'
import { DeckListItem } from './DeckListItem'
import TextButton from './TextButton'

class Decks extends Component {
  state = {
    ready: false
  };

  componentDidMount(){
    const { dispatch } = this.props
    fetchDecks()
      .then((decks)=>dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ready: true})));  
  }

  addDeck = () => {
    this.props.navigation.navigate("AddDeck")
  }

  render() {
    const { decks, navigation } = this.props

    return Object.values(decks).length > 0 ? (
      <View style={styles.container}>
        <FlatList
          data={Object.values(decks)}
          renderItem={({ item }) => (
            <DeckListItem
              id={item.id}
              name={item.name}
              cardCount={item.cards.length}
              navigation = {this.props.navigation}
            />
          )}
          keyExtractor={(item, index) => item.name}
        />
      </View>
    ) : (
      <View style={styles.blank}>
        <Text style={styles.title}>No Decks available, please add a deck!</Text>
        <TextButton
            onPress={() => {
              navigation.navigate("AddDeck")
            }}
          > Create Deck </TextButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  metricCounter: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center'
  },
})

/*
        <TextButton
            onPress={() => {
              navigation.navigate("AddDeck")
            }}
          > Add Deck </TextButton>
*/


function mapStateToProps (decks) {
  return{
    decks
  }
}

export default connect(mapStateToProps)(Decks)