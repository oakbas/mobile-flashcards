import React, { Component } from 'react'
import { KeyboardAvoidingView, View, Text, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { white, gray, red } from '../utils/color'
import TextButton from './TextButton'
import { saveDeck } from '../utils/api'

class AddDeck extends Component {

  state = {
    input: '',
    errorMessage: ''
  };

  generateRandomId() {
    return Math.floor(Math.random()*(100000-0+1)+0).toString()
  }

  handleInputChange = input => {
    this.setState(() => ({
      input
    }));
  };

  handleSubmit = () => {
    const { decks } = this.props

    if (this.state.input !== '') {

      deck = {
        id: this.generateRandomId(),
        name: this.state.input,
        cards: []
      }

      this.props.addDeck(deck.id, deck.name);
      saveDeck(deck)

      this.props.navigation.navigate('DeckEdit', {
        deckId: deck.id
      });

      this.setState({
        input: ''
      });

    } else {
      this.setState({
        message: 'Please fill in a title for your deck',
        input: ''
      });
    }
  };

  render() {
    const { input } = this.state

    return(
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.label}>What is the title of your new deck?</Text>
        <TextInput
        style={styles.input}
        placeholder='Title of New Deck'
        onChangeText={this.handleInputChange}
        value={input}
        />
        <View>
          <Text style={styles.message}>{this.state.message}</Text>
        </View>
        <TextButton onPress={this.handleSubmit}>
          <Text>Add Deck</Text>
        </TextButton>
      </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontSize: 30, 
    color: 'black', 
    textAlign: 'center'
  },
  input: {
    height: 40, 
    width: 320, 
    borderColor:'gray', 
    borderWidth:1, 
    margin: 15, 
    textAlign:'center'
  },
  message: {
    color: red,
    textAlign: 'center'
  }
});

const mapDispatchToProps = dispatch => ({
  addDeck: (id, name) => dispatch(addDeck(id, name))
});

export default connect(null, mapDispatchToProps)(AddDeck)