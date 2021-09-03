import React from 'react'
import { StyleSheet, View } from 'react-native'
import { CardView } from './CardView'
import { Card } from '../game/Card'
import { GAP_SIZE, useCardSize } from '../style/sizes'

export function Board({ cards }: { cards: Card[] }) {
  const { boardSize, cardSize } = useCardSize()

  return (
    <View style={[styles.containerPortrait, { width: boardSize }]}>
      {cards.map((card, index) => (
        <CardView
          card={card}
          key={index}
          cardSize={cardSize}
          margin={GAP_SIZE / 2}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  containerPortrait: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: GAP_SIZE / 2,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
})
