import React, { Component } from 'react'
import { View , Text, StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import { gray } from '../utils/color'


class DeckEdit extends Component {
    render() {
        const { navigation, deck } = this.props;
        return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>{deck.name}</Text>
                <Text style={styles.cardCount}>Card Counts: {deck.cards.length}</Text>
            </View>
            <View style={styles.body}>
                <TextButton onPress={() => navigation.navigate('AddCard', { deckId: deck.id })}>
                    <Text> Add New Card </Text>
            </TextButton>
            {deck.cards.length !== 0 && (
            <TextButton onPress={() => navigation.navigate('Quiz', { deck })}>
              Start Quiz
            </TextButton>
          )}
        </View>
      </View>
      )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      marginTop: 20
    },
    title: {
      fontSize: 18,
      textAlign: "center"
    },
    cardCount: {
      color: gray,
      textAlign: "center",
      marginBottom: 15
    }
  });

const mapStateToProps = (state, {navigation}) => ({
    deck: state[navigation.getParam("deckId")]
});
  
export default connect(mapStateToProps)(DeckEdit);