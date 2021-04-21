/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react'
import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { Board } from './src/component/Board'
import { game } from './src/game/Game'
import { observer } from 'mobx-react-lite'
import { WinOverlayTouch } from './src/component/WinOverlayTouch'
import { useIsPortrait } from './src/util/useIsPortrait'

const App = observer(() => {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  const fontSize = useIsPortrait() ? 22 : 18
  const textStyle = { fontSize }

  React.useEffect(() => {
    game.startGame()
  }, [])

  return (
    <SafeAreaView style={[styles.fullHeight, backgroundStyle]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {game.isCompleted && (
        <WinOverlayTouch
          game={game}
          onClose={() => {
            game.startGame()
          }}
        />
      )}
      <View style={styles.fullHeight}>
        <View style={[styles.row]}>
          <Text style={[styles.text, textStyle]}>Memory Game</Text>
          <Pressable
            onPress={() => {
              // Show modal
            }}>
            <Text style={[styles.text, textStyle]}>Info</Text>
          </Pressable>
        </View>
        <View style={[styles.row]}>
          <Text style={[styles.text, textStyle]}>{game.moves} moves</Text>
          <Text style={[styles.text, textStyle]}>
            {game.timer.seconds} seconds
          </Text>
          <Pressable onPress={() => game.startGame()}>
            <Text style={[styles.text, textStyle]}>Restart</Text>
          </Pressable>
        </View>
        <Board cards={game.cards} />
      </View>
    </SafeAreaView>
  )
})

const styles = StyleSheet.create({
  fullHeight: {
    flex: 1,
  },
  centerVertical: {
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 22,
    fontWeight: '600',
    marginHorizontal: 16,
    marginBottom: 16,
  },
})

export default App
