import React from 'react';
import { View , Text, StyleSheet} from 'react-native';
import TextButton from './TextButton'
import { purple } from '../utils/color'

export default function Result({ correctAnswers, incorrectAnswers, restartQuiz, navigation }) {
    const score = Math.round((correctAnswers * 100) / (correctAnswers + incorrectAnswers));
    return (
    <View style={styles.container}>
        <Text style={styles.header}>Your score:</Text>
        <Text style={styles.result}>{score}</Text>
        <View style={styles.actions}>
            <TextButton onPress={() => restartQuiz()}>Restart Quiz</TextButton>
            <TextButton onPress={() => navigation.goBack()}>
                Back to Deck
            </TextButton>
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
        fontSize: 70,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    result: {
        fontSize: 50,
        color: purple,
        textAlign: 'center'
    },
    actions: {
        marginTop: 50
    }
});