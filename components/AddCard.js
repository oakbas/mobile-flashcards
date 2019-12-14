import React, { Component } from 'react'
import { KeyboardAvoidingView, TextInput, View, Text, StyleSheet} from 'react-native'
import TextButton from './TextButton'
import { white, gray, red } from '../utils/color'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { saveCard } from '../utils/api'

class AddCard extends Component {
  state = {
      question: '',
      answer: '',
      message: ''
  };
  
  handleSubmit = () => {
    if (this.state.question !== '' && this.state.answer !== '' ) {
      deckId = this.props.navigation.getParam('deckId');
      const { question, answer } = this.state;

      this.props.addCard(deckId, question, answer);
      saveCard(deckId, { question, answer });

      this.props.navigation.goBack();

      this.setState({
          question: '',
          answer: ''
      })
    }
    else {
      this.setState({
        message: 'Please fill the form for the card',
        question: '',
        answer: ''
      });
    }
  };

  render() {
    const { question, answer } = this.state;

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View>
          <TextInput
            placeholder='Question'
            style={styles.input}
            value={question}
            onChangeText={question => this.setState({ question })}
          />
          <TextInput
            placeholder='Answer'
            style={styles.input}
            value={answer}
            onChangeText={answer => this.setState({ answer })}
          />
          </View>
          <View>
              <Text style={styles.message}>{this.state.message}</Text>
          </View>
          <View>
              <TextButton onPress={this.handleSubmit}>Submit</TextButton>
          </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  message: {
    color: red,
    textAlign: 'center'
  },
  input: {
    height: 40, 
    width: 320, 
    borderColor:'gray', 
    borderWidth:1, 
    margin: 15, 
    textAlign:'center'
  }
});
  
const mapDispatchToProps = dispatch => ({
    addCard: (deckId, question, answer) => dispatch(addCard(deckId, question, answer))
});
  
export default connect(null, mapDispatchToProps)(AddCard);