import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { lightPurp } from '../utils/color'
import TextButton from './TextButton'

class Card extends Component {
  state = {
    showQuestion: true
  };
  
  toggleQuestionAnswer = () => {
    this.setState(state => ({
      showQuestion: !state.showQuestion
    }));
  };
  
  render() {
    const { showQuestion } = this.state;
    const { card } = this.props;
    let flipText = 'See the question'
    if (showQuestion) {
      flipText = 'See the answer'
    }
      
    return (
      <View style={styles.container}>
        <View>
          {this.state.showQuestion ? (
          <Text style={styles.text}>{card.question}</Text>
          ) : (
          <Text style={styles.text}>{card.answer}</Text>
          )}
        </View>
        <View style={{ marginTop: 30 }}>
          <TextButton onPress={this.toggleQuestionAnswer}>{flipText}
          </TextButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: lightPurp
  }
});
  
export default Card;