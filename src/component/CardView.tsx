import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Card } from '../game/Card'
import { observer } from 'mobx-react-lite'
import Icon from 'react-native-vector-icons/FontAwesome'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

const MATCH_STEP_DURATION = 120
const NO_MATCH_STEP_DURATION = 120
export const NO_MATCH_ANIMATION_DURATION = NO_MATCH_STEP_DURATION * 5

function useMatchAnimation() {
  const runMatchAnimation = useSharedValue(false)
  const matchAnimationStyle = useAnimatedStyle(() => {
    // Code here runs on the UI thread, so it will be synchronous
    if (!runMatchAnimation.value) {
      return {
        transform: [{ scaleX: 1 }, { scaleY: 1 }],
      }
    }
    return {
      transform: [
        {
          scaleX: withSequence(
            withTiming(1.4, { duration: MATCH_STEP_DURATION }),
            withTiming(0.7, { duration: MATCH_STEP_DURATION * 1.2 }),
            withTiming(1.2, { duration: MATCH_STEP_DURATION * 1.4 }),
            withTiming(0.9, { duration: MATCH_STEP_DURATION * 1.6 }),
            withTiming(1, { duration: MATCH_STEP_DURATION * 1.8 }),
          ),
        },
        {
          scaleY: withSequence(
            withTiming(0.6, { duration: MATCH_STEP_DURATION }),
            withTiming(1.3, { duration: MATCH_STEP_DURATION * 1.2 }),
            withTiming(0.8, { duration: MATCH_STEP_DURATION * 1.4 }),
            withTiming(1.1, { duration: MATCH_STEP_DURATION * 1.6 }),
            withTiming(1, { duration: MATCH_STEP_DURATION * 1.8 }),
          ),
        },
      ],
    }
  })
  return { runMatchAnimation, matchAnimationStyle }
}

function useNoMatchAnimation() {
  const runNoMatchAnimation = useSharedValue(false)
  const noMatchAnimationStyle = useAnimatedStyle(() => {
    if (!runNoMatchAnimation.value) {
      return {
        transform: [{ translateX: 0 }, { rotateZ: '0deg' }],
      }
    }
    return {
      transform: [
        {
          translateX: withSequence(
            withTiming(15, { duration: NO_MATCH_STEP_DURATION }),
            withTiming(-11.25, { duration: NO_MATCH_STEP_DURATION }),
            withTiming(7.5, { duration: NO_MATCH_STEP_DURATION }),
            withTiming(-3.75, { duration: NO_MATCH_STEP_DURATION }),
            withTiming(0, { duration: NO_MATCH_STEP_DURATION }),
          ),
        },
        {
          rotateZ: withSequence(
            withTiming('6deg', { duration: NO_MATCH_STEP_DURATION }),
            withTiming('-4.5deg', { duration: NO_MATCH_STEP_DURATION }),
            withTiming('3deg', { duration: NO_MATCH_STEP_DURATION }),
            withTiming('-1.5deg', { duration: NO_MATCH_STEP_DURATION }),
            withTiming('0deg', { duration: NO_MATCH_STEP_DURATION }),
          ),
        },
      ],
    }
  })
  return { runNoMatchAnimation, noMatchAnimationStyle }
}

interface CardViewProps {
  card: Card
  cardSize: number
  margin: number
}

export const CardView = observer(
  ({ card, cardSize, margin }: CardViewProps) => {
    const { runMatchAnimation, matchAnimationStyle } = useMatchAnimation()
    runMatchAnimation.value = card.isMatched

    const { runNoMatchAnimation, noMatchAnimationStyle } = useNoMatchAnimation()
    runNoMatchAnimation.value = card.isNotMatched

    return (
      <Animated.View style={[matchAnimationStyle, noMatchAnimationStyle]}>
        <Pressable
          style={[
            styles.container,
            {
              width: cardSize,
              height: cardSize,
              margin: margin,
              backgroundColor: card.backgroundColor,
            },
          ]}
          onPress={() => {
            card.onClick()
          }}>
          {!card.isInvisible && (
            <View style={styles.center}>
              <Icon name={card.type} size={30} color="#fff" />
            </View>
          )}
        </Pressable>
      </Animated.View>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
