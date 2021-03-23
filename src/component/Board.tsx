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
  const size = useCardSize()

  return (
    <View style={styles.container}>
      {cards.map((card, index) => (
        <CardView card={card} key={index} cardSize={size} gapSize={GAP_SIZE} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 8,
  },
})

// Card size - https://stackoverflow.com/q/29394297/4034572

const COLUMN_COUNT = 4
export const GAP_SIZE = 8

function useCardSize(): number {
  const windowWidth = useWindowDimensions().width
  // We use COLUMN_COUNT + 1 because there is gap at the left and right of each
  // column, and at the lef and right of the board
  const size = (windowWidth - GAP_SIZE * 2 * (COLUMN_COUNT + 1)) / COLUMN_COUNT
  return size
}
