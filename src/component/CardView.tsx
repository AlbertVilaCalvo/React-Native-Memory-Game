import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Card } from '../model/Card'

interface CardViewProps {
  card: Card
  cardSize: number
  gapSize: number
}

export function CardView({ card, cardSize, gapSize }: CardViewProps) {
  return (
    <View
      style={[
        styles.container,
        { width: cardSize, height: cardSize, margin: gapSize },
      ]}>
      <Pressable onPress={() => {}}>
        <Text>{card.type}</Text>
        <Text>isVisible: {card.isVisible.toString()}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    borderWidth: 3,
    borderRadius: 8,
    borderColor: 'blue',
    padding: 10,
  },
})
