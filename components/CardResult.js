import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { green, red, purple, gray} from '../utils/color'

export default function CardResult({ recordCard }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Correct or Incorrect?</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.correctBtn}
          onPress={() => recordCard(true)}
        >
          <Text style={styles.correctBtnText}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.incorrectBtn}
          onPress={() => recordCard(false)}
        >
          <Text style={styles.incorrectBtnText}>Incorrect</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      marginTop: 100
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    actions: {
      marginTop: 20
    },
    correctBtnText: {
      textAlign: 'center',
      color: green,
    },
    incorrectBtnText: {
      textAlign: 'center',
      color: red,
    },
    correctBtn: {
      borderRadius: 5,
      backgroundColor: 'white',
      borderColor: 'red',
      margin: 10,
      width: 100
    },
    incorrectBtn: {
      borderRadius: 5,
      backgroundColor: 'white',
      borderColor: 'green',
      margin: 10,
      width: 100
    },
});