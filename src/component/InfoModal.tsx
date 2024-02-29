import { Linking, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { Color } from '../style/Color'
import React from 'react'

interface Props {
  /** Invoked when the close button is pressed. */
  onClose: () => void
}

export function InfoModal({ onClose }: Props) {
  return (
    <Modal animationType="slide">
      <View style={styles.modalContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.closePressable,
            {
              backgroundColor: pressed ? Color.redLight : Color.red,
            },
          ]}
          onPress={onClose}>
          <Text style={styles.closeText} accessibilityHint="Close">
            X
          </Text>
        </Pressable>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Hi!</Text>
          <Text style={styles.text}>
            This app is built with React Native, TypeScript and MobX for state
            management.
          </Text>
          <Text style={styles.text}>
            Animations and gestures are implemented with Animated, Reanimated
            and PanResponder.
          </Text>
          <Text style={styles.text}>
            You can find the source code on GitHub at{' '}
            <Text
              style={styles.link}
              onPress={() =>
                Linking.openURL(
                  'https://github.com/AlbertVilaCalvo/React-Native-Memory-Game',
                )
              }>
              https://github.com/AlbertVilaCalvo/React-Native-Memory-Game
            </Text>
          </Text>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 40,
    backgroundColor: Color.blue,
  },
  closePressable: {
    backgroundColor: Color.red,
    alignSelf: 'flex-end',
    width: 50,
    height: 50,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 20,
  },
  textContainer: {
    flex: 0.75,
    justifyContent: 'center',
  },
  text: {
    color: Color.dark,
    fontSize: 18,
    marginBottom: 15,
  },
  link: {
    textDecorationLine: 'underline',
  },
})
