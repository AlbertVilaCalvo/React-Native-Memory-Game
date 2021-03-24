import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Card } from '../model/Card'
import { observer } from 'mobx-react-lite'
import Icon from 'react-native-vector-icons/FontAwesome'
import { CardState } from '../model/CardState'

interface CardViewProps {
  card: Card
  cardSize: number
  gapSize: number
}

export const CardView = observer(
  ({ card, cardSize, gapSize }: CardViewProps) => {
    return (
      <Pressable
        style={[
          styles.container,
          {
            width: cardSize,
            height: cardSize,
            margin: gapSize,
            backgroundColor: card.backgroundColor,
          },
        ]}
        onPress={() => {
          card.onClick()
        }}>
        {card.state !== CardState.Invisible && (
          <View style={styles.center}>
            <Icon name={card.type} size={30} color="#fff" />
          </View>
        )}
      </Pressable>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderColor: 'blue',
    padding: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
