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
import { WinOverlay } from './src/component/WinOverlay'

const App = observer(() => {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  React.useEffect(() => {
    game.startGame()
  }, [])

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        <WinOverlay show={game.isCompleted} onClose={() => game.startGame()} />
        <View style={styles.row}>
          <Text style={styles.text}>{game.moves} moves</Text>
          <Text style={styles.text}>{game.timer.seconds} seconds</Text>
          <Pressable
            onPress={() => {
              game.startGame()
            }}>
            <Text style={styles.text}>Restart</Text>
          </Pressable>
        </View>
        <Board cards={game.cards} />
      </View>
    </SafeAreaView>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 22,
    fontWeight: '600',
    marginHorizontal: 16,
    marginVertical: 16,
  },
})

export default App
