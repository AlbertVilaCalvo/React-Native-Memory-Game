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
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { Board } from './src/component/Board'
import { game } from './src/model/Game'
import { observer } from 'mobx-react-lite'

const App = observer(() => {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  React.useEffect(() => {
    game.startGame()
  }, [])

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text style={styles.text}>{game.moves} moves</Text>
        <Board cards={game.cards} />
        {game.isCompleted && <Text style={styles.text}>Congratulations!</Text>}
      </ScrollView>
    </SafeAreaView>
  )
})

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    fontWeight: '600',
    marginHorizontal: 16,
    marginVertical: 16,
  },
})

export default App
