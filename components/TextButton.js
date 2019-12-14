import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { white, lightPurp } from '../utils/color'

export default function TextButton ({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.reset, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  reset: {
    textAlign: 'center',
    color: white,
  },
  button: {
    borderRadius: 5,
    backgroundColor: lightPurp,
    margin: 10,
    padding: 10,
    width: 200
  },
})