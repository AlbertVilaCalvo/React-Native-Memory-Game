import React from 'react'
import { StyleSheet, useWindowDimensions, View } from 'react-native'
import { Card } from '../model/Card'
import { CardView } from './CardView'
import { CardType } from '../model/CardType'

const cardTypes: CardType[] = []
for (const cardType in CardType) {
  // https://stackoverflow.com/a/58509049/4034572
  const aCardType: CardType = CardType[cardType as keyof typeof CardType]
  cardTypes.push(aCardType)
  cardTypes.push(aCardType)
}

const cards: Card[] = cardTypes.map((cardType) => new Card(cardType))

export function Board() {
  const { boardSize, cardSize } = useCardSize()

  return (
    <View style={[styles.containerPortrait, { width: boardSize }]}>
      {cards.map((card, index) => (
        <CardView
          card={card}
          key={index}
          cardSize={cardSize}
          gapSize={GAP_SIZE}
        />
      ))}
    </View>
  )
}

// Card size - https://stackoverflow.com/q/29394297/4034572

const COLUMN_COUNT = 4
const GAP_SIZE = 8
const VERTICAL_SPACE_ON_LANDSCAPE = 80

function useCardSize(): { boardSize: number; cardSize: number } {
  const { width, height } = useWindowDimensions()
  const isPortrait = height > width
  const size = isPortrait ? width : height - VERTICAL_SPACE_ON_LANDSCAPE
  // We use COLUMN_COUNT + 1 because there is gap at the left and right of
  // each column, and at the lef and right of the whole board
  return {
    boardSize: size,
    cardSize: (size - GAP_SIZE * 2 * (COLUMN_COUNT + 1)) / COLUMN_COUNT,
  }
}

const styles = StyleSheet.create({
  containerPortrait: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    padding: GAP_SIZE,
  },
})
