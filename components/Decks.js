import React, { Component } from 'react'
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {receiveDecks} from '../actions/index'
import { fetchDecks } from '../utils/api'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import { white, purple } from '../utils/color'

class Decks extends Component {
  componentDidMount() {
    fetchDecks()
      .then(data => {
        this.props.receiveDecks(data);
      })
      .then(() =>
        this.setState(() => ({
          ready: true
        }))
      );
  }
  state = {
    ready: false
  };

  renderItem = ({ item }) => {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
        style={styles.button}
        onPress={() =>
        navigation.navigate('DeckEdit', { deckId: item.id, name: item.name })
      }>
        <Text style={styles.text}>Title: {item.name}</Text>
        <Text style={styles.text}>Card Counts: {item.cards.length}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { decks, navigation } = this.props
    return Object.values(decks).length > 0 ? (
      <View style={styles.container}>
        <FlatList
          data={decks && Object.values(decks)}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => item.id}
        />
      </View>
    ) :
    (
      <View style={styles.container}>
        <Text style={styles.title}>No decks available, please add a deck!</Text>
        <TextButton
        onPress={() => { navigation.navigate('AddDeck')}}
        > Create Deck </TextButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30
  },
  title: {
    margin: 20,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  button: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: purple,
    backgroundColor: white,
    margin: 10,
    padding: 10,
    width: 200
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  }
})

function mapDispatchToProps(dispatch){
  return {
    receiveDecks: (decks) => dispatch(receiveDecks(decks))
  }
}

const mapStateToProps = decks => ({ decks });

export default connect(mapStateToProps, mapDispatchToProps)(Decks)