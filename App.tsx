/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react'
import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native'
import { Board } from './src/component/Board'
import { GAP_SIZE, useCardSize } from './src/style/sizes'
import { game } from './src/game/Game'
import { observer } from 'mobx-react-lite'
import { WinOverlayTouch } from './src/component/WinOverlayTouch'
import { useIsPortrait } from './src/util/useIsPortrait'
import { Color } from './src/style/Color'
import { InfoModal } from './src/component/InfoModal'
import LinearGradient from 'react-native-linear-gradient'

const App = observer(() => {
  const isDarkMode = useColorScheme() === 'dark'
  const isPortrait = useIsPortrait()
  const { boardSize } = useCardSize()

  const [showInfoModal, setShowInfoModal] = React.useState(false)

  const textStyleTop = { fontSize: isPortrait ? 22 : 18 }
  const textStyleBottom = { fontSize: isPortrait ? 24 : 20 }
  const row2Style = {
    marginTop: isPortrait ? 12 : 3,
    marginBottom: isPortrait ? 15 : 2,
  }

  React.useEffect(() => {
    game.startGame()
  }, [])

  return (
    <SafeAreaView style={styles.fullHeight}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <LinearGradient
        colors={[Color.teal, Color.purple]}
        useAngle={true}
        angle={135}
        style={[styles.container]}>
        <View style={styles.spaceTop} />
        <View style={[styles.row1, { width: boardSize }]}>
          <Text style={[styles.title, textStyleTop]}>Memory Game</Text>
          <Pressable
            style={({ pressed }) => [
              styles.restartPressable,
              {
                backgroundColor: pressed ? Color.blue : Color.blueLight,
              },
            ]}
            onPress={() => game.startGame()}>
            <Text style={[styles.restartText, textStyleTop]}>restart</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.infoPressable,
              {
                backgroundColor: pressed ? Color.teal : Color.tealLight,
              },
            ]}
            onPress={() => {
              setShowInfoModal(true)
            }}>
            <Text style={[styles.infoText, textStyleTop]}>i</Text>
          </Pressable>
        </View>
        <View style={[styles.row2, row2Style, { width: boardSize }]}>
          <Text style={[styles.textBottom, textStyleBottom]}>
            {game.moves} moves
          </Text>
          <Text style={[styles.textBottom, textStyleBottom]}>
            {game.timer.seconds} s
          </Text>
        </View>
        <Board cards={game.cards} />
        <View style={styles.spaceBottom} />
      </LinearGradient>

      {game.isCompleted && (
        <WinOverlayTouch
          game={game}
          onClose={() => {
            game.startGame()
          }}
        />
      )}

      {showInfoModal && <InfoModal onClose={() => setShowInfoModal(false)} />}
    </SafeAreaView>
  )
})

const styles = StyleSheet.create({
  fullHeight: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  spaceTop: {
    flex: 1,
  },
  spaceBottom: {
    flex: 2,
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: GAP_SIZE,
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: GAP_SIZE,
  },
  title: {
    textAlignVertical: 'center',
    color: Color.dark,
  },
  textBottom: {
    fontWeight: 'bold',
    color: Color.dark,
  },
  infoPressable: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: Color.teal,
  },
  infoText: {
    fontWeight: '600',
    color: Color.dark,
  },
  restartPressable: {
    justifyContent: 'center',
    paddingHorizontal: 5,
    paddingBottom: 5,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: Color.blue,
  },
  restartText: {
    color: Color.dark,
  },
})

export default App
