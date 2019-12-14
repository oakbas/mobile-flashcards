import React, { Component } from 'react'
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {receiveDecks} from '../actions/index'
import { fetchDecks } from '../utils/api'
import { connect } from 'react-redux'
import TextButton from './TextButton'

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
      <View>
        <TouchableOpacity
        style={styles.deckContainer}
        onPress={() =>
        navigation.navigate('DeckEdit', { deckId: item.id, name: item.name })
      }>
        <Text>{item.name}</Text>
        <Text>Card Counts: {item.cards.length}</Text>
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
      <View style={styles.blank}>
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
    marginTop: 100
  },
  title: {
    margin: 20,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  deckContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})

function mapDispatchToProps(dispatch){
  return {
      receiveDecks: (decks) => dispatch(receiveDecks(decks))
  }
}
const mapStateToProps = decks => ({ decks });
export default connect(mapStateToProps, mapDispatchToProps)(Decks)