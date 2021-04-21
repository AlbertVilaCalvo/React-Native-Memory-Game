import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
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
        <Text>Hi!</Text>
        <Text>You can find the source code on GitHub:</Text>
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
})
