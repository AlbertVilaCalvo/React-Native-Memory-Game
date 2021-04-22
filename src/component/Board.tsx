import React from 'react'
import { StyleSheet } from 'react-native'
import { CardView } from './CardView'
import { Card } from '../game/Card'
import LinearGradient from 'react-native-linear-gradient'
import { Color } from '../style/Color'
import { GAP_SIZE, useCardSize } from '../style/sizes'

export function Board({ cards }: { cards: Card[] }) {
  const { boardSize, cardSize } = useCardSize()

  return (
    <LinearGradient
      colors={[Color.teal, Color.purple]}
      useAngle={true}
      angle={135}
      style={[styles.containerPortrait, { width: boardSize }]}>
      {cards.map((card, index) => (
        <CardView
          card={card}
          key={index}
          cardSize={cardSize}
          gapSize={GAP_SIZE}
        />
      ))}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  containerPortrait: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: GAP_SIZE,
    borderRadius: 10,
  },
})
