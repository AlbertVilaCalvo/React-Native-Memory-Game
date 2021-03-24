import { autorun, makeAutoObservable } from 'mobx'
import { generateInitialCards } from './generateInitialCards'
import { Card } from './Card'

export class Game {
  cards: Card[] = []
  clicks = 0

  constructor() {
    makeAutoObservable(this)
  }

  startGame() {
    console.log('startGame()')
    this.cards = generateInitialCards()
  }

  incrementClicks() {
    this.clicks++
  }

  get moves() {
    return Math.floor(this.clicks / 2)
  }
}

export const game = new Game()

autorun(() => {
  if (__DEV__) {
    console.log('autorun game clicks', game.clicks, 'cards', game.cards)
  }
})
