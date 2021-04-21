import * as React from 'react'
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
} from 'react-native'
import { Color } from '../style/Color'

// Inspired by https://github.com/warlyware/react-native-cookbook/blob/master/chapter-6/notification-animation/Notification/index.js

interface Props {
  /** Whether to show or hide the overlay.  */
  show: boolean
  /** Invoked when the 'Play again!' button is pressed. */
  onPlayAgainPress: () => void
}

/**
 * Has a 'Play again!' button that invokes `onPlayAgainPress` when pressed.
 */
export function WinOverlayButton({ show, onPlayAgainPress }: Props) {
  const { height: screenHeight } = useWindowDimensions()

  const animatedValue = React.useRef(new Animated.Value(0))

  React.useEffect(() => {
    if (show) {
      Animated.timing(animatedValue.current, {
        toValue: 1,
        duration: 1000,
        easing: Easing.cubic,
        useNativeDriver: false, // 'top' is not supported by native animated module
      }).start()
    } else {
      Animated.timing(animatedValue.current, {
        toValue: 0,
        duration: 800,
        easing: Easing.cubic,
        useNativeDriver: false,
      }).start()
    }
  }, [show, animatedValue])

  const top = animatedValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [-screenHeight, 0],
  })

  return (
    <Animated.View style={[styles.main, { height: screenHeight, top }]}>
      <Text style={styles.title}>Congratulations! You won!</Text>
      <Text style={styles.text}>With X moves and X seconds.</Text>
      <Text style={styles.text}>Woooooo!</Text>
      <Pressable style={styles.button} onPress={() => onPlayAgainPress()}>
        <Text style={styles.buttonText}>Play again!</Text>
      </Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 10,
    zIndex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Color.black,
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 10,
  },
  text: {
    color: Color.gray,
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  // TODO change button color when pressed
  button: {
    backgroundColor: Color.teal,
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 5,
  },
  buttonText: {
    color: Color.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
})
